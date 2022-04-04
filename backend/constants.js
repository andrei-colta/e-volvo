const DATA_RETRIEVED = 'DataRetrieved';
const DATA_UPDATED = 'DataUpdated';
const DATA_INSERTED = 'DataInserted';
const DATA_DELETED = 'DataDeleted';
const DATA_NOT_INSERTED = 'DataNotInserted';
const DATA_NOT_UPDATED = 'DataNotUpdated';
const DATA_NOT_DELETED = 'DataNotDeleted';
const NOT_FOUND = 'NotFound';
const PRIVATE_PROFILE = 'PrivateProfile';
const USER_BANNED = 'UserBanned';
const LOGIN_SUCCESSFUL = 'LoginSuccessful';
const LOGIN_FAILED = 'LoginFailed';
const FILE_UPLOADED = 'FileUploaded';
const FILE_NOT_UPLOADED = 'FileNotUploaded';
const ACCOUNT_ALREADY_EXISTS = 'AccountAlreadyExists';
const SIGNUP_FAILED = 'SignupFailed';
const PASSWORD_CHANGED = 'PasswordChanged';
const PASSWORD_NOT_CHANGED = 'PasswordNotChanged';

const FORBIDDEN = 'FORBIDDEN';

const PUBLIC_VISIBILITY = 'Pu';
const PRIVATE_VISIBILITY = 'Pr';

const DEFAULT_PROFILE_PICTURE = 'https://i.stack.imgur.com/34AD2.jpg';
const GET_PICTURE_ENDPOINT = 'http://localhost:1234/profile/getPicture?fileName=';

module.exports = {
    // responses
    DATA_RETRIEVED,
    NOT_FOUND,
    DATA_UPDATED,
    DATA_INSERTED,
    DATA_DELETED,
    DATA_NOT_INSERTED,
    DATA_NOT_UPDATED,
    DATA_NOT_DELETED,
    PRIVATE_PROFILE,
    USER_BANNED,
    LOGIN_SUCCESSFUL,
    LOGIN_FAILED,
    FILE_UPLOADED,
    FILE_NOT_UPLOADED,
    ACCOUNT_ALREADY_EXISTS,
    SIGNUP_FAILED,
    FORBIDDEN,
    PASSWORD_CHANGED,
    PASSWORD_NOT_CHANGED,
    // other constants
    PUBLIC_VISIBILITY,
    PRIVATE_VISIBILITY,
    DEFAULT_PROFILE_PICTURE,
    GET_PICTURE_ENDPOINT,
}