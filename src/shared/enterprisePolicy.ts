import { ApiFormat } from './providers';

export const EnterpriseOidc = {
  AuthorizationEndpoint: 'http://xsso.sz-mtr.com:8091/sso/oauth2/authorize',
  TokenEndpoint: 'http://xsso.sz-mtr.com:8091/sso/oauth2/token',
  UserInfoEndpoint: 'http://xsso.sz-mtr.com:8091/sso/oauth2/userinfo',
  ClientId: '855f65e5-4f43-11f1-a80b-c4c063b3c682',
  ClientSecret: '855f65f3-4f43-11f1-a80b-c4c063b3c682',
  RedirectUri: 'metroai://auth/callback',
  Scope: 'openid profile email',
  ResponseType: 'code',
  CodeChallengeMethod: 'S256',
} as const;

export const EnterpriseProvider = {
  Key: 'custom_0',
  DisplayName: '公司内部 Provider',
  BaseUrl: 'http://127.0.0.1:3000/v1',
  ApiFormat: ApiFormat.OpenAI,
  DefaultModelId: 'glm-4.7',
  DefaultModelName: 'GLM 4.7',
} as const;

export const EnterpriseFeaturePolicy = {
  AllowManualMcpServers: false,
  AllowManualSkillSources: false,
  AllowProviderManagement: false,
} as const;
