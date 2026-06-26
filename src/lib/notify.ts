import { SolapiMessageService } from "solapi";
import { site } from "@/data/site";

/**
 * Solapi 알림톡 발송 (지점별).
 * 환경변수가 설정돼 있지 않으면 발송을 건너뜁니다(개발/미설정 안전).
 *
 * 계정 공통 env:
 *   SOLAPI_API_KEY, SOLAPI_API_SECRET   - API 인증
 *   SOLAPI_SENDER                       - 발신번호(공통)
 *   ALERT_PHONES                        - 새 지원 알림 받을 직원번호(공통, 쉼표)
 *
 * 지점별 env (N = 1,2,3 … site.branches 순서와 일치):
 *   SOLAPI_PFID_N                       - 해당 지점 카카오 발신프로필(pfId)
 *   SOLAPI_TEMPLATE_NEW_N               - 직원용: 새 지원 접수
 *   SOLAPI_TEMPLATE_RECEIVED_N          - 지원자용: 지원 완료
 *   SOLAPI_TEMPLATE_PASS_N              - 지원자용: 합격
 *   SOLAPI_TEMPLATE_FAIL_N              - 지원자용: 불합격
 *
 * 예) site.branches = ["화순점","첨단점","동광주점"]
 *     → _1=화순점, _2=첨단점, _3=동광주점
 */

type ApplicationLike = {
  name: string;
  email: string;
  phone: string;
  openingTitle: string;
  branch: string | null;
  createdAt: Date;
};

type TemplateKind = "NEW" | "RECEIVED" | "PASS" | "FAIL";

const onlyDigits = (p: string) => p.replace(/\D/g, "");

const accountReady = () =>
  Boolean(
    process.env.SOLAPI_API_KEY &&
      process.env.SOLAPI_API_SECRET &&
      process.env.SOLAPI_SENDER
  );

/**
 * 공고 근무지 문자열에서 지점명을 판별한다.
 * 예) "피트니스스타 첨단점" → "첨단점". 매칭 없으면 null.
 */
export function resolveBranch(location: string | null | undefined): string | null {
  if (!location) return null;
  return site.branches.find((b) => location.includes(b)) ?? null;
}

/** 지점명 → env 접미사 번호(1-based). 매칭 없으면 null. */
function branchIndex(branch: string | null): number | null {
  if (!branch) return null;
  const i = (site.branches as readonly string[]).indexOf(branch);
  return i >= 0 ? i + 1 : null;
}

/** 지점의 pfId + 템플릿ID를 env에서 가져온다. */
function branchConfig(branch: string | null, kind: TemplateKind) {
  const n = branchIndex(branch);
  if (!n) return { pfId: undefined, templateId: undefined };
  return {
    pfId: process.env[`SOLAPI_PFID_${n}`],
    templateId: process.env[`SOLAPI_TEMPLATE_${kind}_${n}`],
  };
}

async function sendAlimtalk(
  to: string,
  branch: string | null,
  kind: TemplateKind,
  variables: Record<string, string>
) {
  const { pfId, templateId } = branchConfig(branch, kind);
  if (!accountReady() || !pfId || !templateId) {
    console.log("[알림톡 스킵] 미설정", {
      to,
      branch,
      kind,
      hasPfId: !!pfId,
      hasTemplate: !!templateId,
    });
    return;
  }
  try {
    const service = new SolapiMessageService(
      process.env.SOLAPI_API_KEY!,
      process.env.SOLAPI_API_SECRET!
    );
    await service.send({
      to: onlyDigits(to),
      from: onlyDigits(process.env.SOLAPI_SENDER!),
      kakaoOptions: { pfId, templateId, variables },
    });
  } catch (e) {
    console.error("[알림톡 실패]", e);
  }
}

/** 직원(대표·나)에게 새 지원 알림 — 수신번호는 공통, 발송 채널은 지점 것 */
export async function notifyNewApplication(app: ApplicationLike) {
  const phones = (process.env.ALERT_PHONES ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (phones.length === 0) return;

  const variables = {
    "#{포지션}": app.openingTitle,
    "#{이름}": app.name,
    "#{연락처}": app.phone,
    "#{이메일}": app.email,
    "#{접수시간}": new Date(app.createdAt).toLocaleString("ko-KR"),
  };
  await Promise.allSettled(
    phones.map((p) => sendAlimtalk(p, app.branch, "NEW", variables))
  );
}

/** 지원자에게 지원 완료 알림 */
export async function notifyApplicationReceived(app: ApplicationLike) {
  await sendAlimtalk(app.phone, app.branch, "RECEIVED", {
    "#{이름}": app.name,
    "#{포지션}": app.openingTitle,
  });
}

/** 지원자에게 합격/불합격 결과 알림 */
export async function notifyApplicationResult(
  app: ApplicationLike,
  passed: boolean
) {
  await sendAlimtalk(app.phone, app.branch, passed ? "PASS" : "FAIL", {
    "#{이름}": app.name,
    "#{포지션}": app.openingTitle,
  });
}
