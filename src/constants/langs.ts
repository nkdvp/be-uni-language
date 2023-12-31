interface DefaultLangType {
  VALIDATE_ERROR: string;
  MALFORMED_JSON_REQUEST_BODY: string;
  INTERNAL_SERVER_ERROR: string;
  BAD_REQUEST: string;
  SUCCESS: string;
  CREATED: string;
  UNAUTHORIZED: string;
  INVALID_OR_EXPIRED_TOKEN: string;
  PERMISSION_DENIED: string;
  RESOURCE_NOT_FOUND: string;
  ALREADY_EXISTS: string;
}
const DefaultLangs: DefaultLangType = {
  VALIDATE_ERROR: 'VALIDATE_ERROR',
  MALFORMED_JSON_REQUEST_BODY: 'MALFORMED_JSON_REQUEST_BODY',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  BAD_REQUEST: 'BAD_REQUEST',
  SUCCESS: 'SUCCESS',
  CREATED: 'CREATED',
  UNAUTHORIZED: 'UNAUTHORIZED',
  INVALID_OR_EXPIRED_TOKEN: 'INVALID_OR_EXPIRED_TOKEN',
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
};

export default DefaultLangs;
