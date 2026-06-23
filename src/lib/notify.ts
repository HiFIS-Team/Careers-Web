import { SolapiMessageService } from "solapi";

/**
 * Solapi 알림톡 발송.
 * 환경변수가 설정돼 있지 않으면 발송을 건너뜁니다(개발/미설정 안전).
 *
 * 필요한 env:
 *   SOLAPI_API_KEY, SOLAPI_API_SECRET   - API 인증
 *   SOLAPI_SENDER                       - 발신번호
 *   SOLAPI_PFID                         - 카카오 발신프로필(pfId)
 *   SOLAPI_TEMPLATE_NEW                 - 직원용: 새 지원 접수
 *   SOLAPI_TEMPLATE_RECEIVED            - 지원자용: 지원 완료
 *   SOLAPI_TEMPLATE_PASS                - 지원자용: 합격
 *   SOLAPI_TEMPLATE_FAIL                - 지원자용: 불합격
 *   ALERT_PHONES                        - 직원 수신번호(쉼표)
 */

type ApplicationLike = {
  name: string;
  email: string;
  phone: string;
  openingTitle: string;
  createdAt: Date;
};

const cfg = {
  apiKey: process.env.SOLAPI_API_KEY,
  apiSecret: process.env.SOLAPI_API_SECRET,
  sender: process.env.SOLAPI_SENDER,
  pfId: process.env.SOLAPI_PFID,
};

const onlyDigits = (p: string) => p.replace(/\D/g, "");
const enabled = () =>
  Boolean(cfg.apiKey && cfg.apiSecret && cfg.sender && cfg.pfId);

async function sendAlimtalk(
  to: string,
  templateId: string | undefined,
  variables: Record<string, string>
) {
  if (!enabled() || !templateId) {
    console.log("[알림톡 스킵] 미설정", { to, hasTemplate: !!templateId });
    return;
  }
  try {
    const service = new SolapiMessageService(cfg.apiKey!, cfg.apiSecret!);
    await service.send({
      to: onlyDigits(to),
      from: onlyDigits(cfg.sender!),
      kakaoOptions: { pfId: cfg.pfId!, templateId, variables },
    });
  } catch (e) {
    console.error("[알림톡 실패]", e);
  }
}

/** 직원(대표·나)에게 새 지원 알림 */
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
    phones.map((p) => sendAlimtalk(p, process.env.SOLAPI_TEMPLATE_NEW, variables))
  );
}

/** 지원자에게 지원 완료 알림 */
export async function notifyApplicationReceived(app: ApplicationLike) {
  await sendAlimtalk(app.phone, process.env.SOLAPI_TEMPLATE_RECEIVED, {
    "#{이름}": app.name,
    "#{포지션}": app.openingTitle,
  });
}

/** 지원자에게 합격/불합격 결과 알림 */
export async function notifyApplicationResult(
  app: ApplicationLike,
  passed: boolean
) {
  const templateId = passed
    ? process.env.SOLAPI_TEMPLATE_PASS
    : process.env.SOLAPI_TEMPLATE_FAIL;
  await sendAlimtalk(app.phone, templateId, {
    "#{이름}": app.name,
    "#{포지션}": app.openingTitle,
  });
}
