// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    // endpoints
    rootURL: 'http://localhost:1234/',
    chatRootURL: 'http://localhost:3000/',
    GET_PICTURE_ENDPOINT: 'http://localhost:1234/profile/getPicture?fileName=',
    // responses
    DATA_RETRIEVED: 'DataRetrieved',
    DATA_UPDATED: 'DataUpdated',
    NOT_FOUND: 'NotFound',
    FORBIDDEN: 'FORBIDDEN',
    DATA_INSERTED: 'DataInserted',
    LOGIN_SUCCESSFUL: 'LoginSuccessful',
    DATA_NOT_UPDATED: 'DataNotUpdated',
    PRIVATE_PROFILE: 'PrivateProfile',
    PASSWORD_CHANGED: 'PasswordChanged',
    NOT_LOGGED: 'NotLogged',
    // -- alert messages
    // Validation messages
    FIELDS_NOT_VALID: 'Some fields are not valid! Please check them and try again',
    REQUIRED_FIELD: 'This field is required',
    FIELD_UPPER_LOWER_COMMON: 'can only contain uppercase and lowercase letters and common characters',
    FIELD_NUMBERS: 'can only contain numbers',
    EMAIL_NOT_VALID: 'This email address is not valid',
    NEW_PASSWORD_NOT_VALID: 'New password is not valid',
    PASSWORDS_DONT_MATCH: 'Passwords do not match',
    // Response alerts
    DATA_UPDATED_MESSAGE: 'Data updated successfully!',
    DATA_NOT_UPDATED_MESSAGE: 'Data could not be updated',
    VISIBILITY_UPDATED: 'Visibility Updated',
    VISIBILITY_NOT_UPDATED: 'Visibility could not be updated! Please try again',
    PASSWORD_CHANGED_MESSAGE: 'Password Changed Successfully',
    PASSWORD_NOT_CHANGED_MESSAGE: 'Password Could not be changed',
    LOGIN_FAILED_MESSAGE: 'Email and password combination is wrong. Please try again',
    LOGIN_FIELDS_EMPTY_MESSAGE: 'Please enter a valid email and password!',
    // other constants
    SUCCESS_COLOR: '#0ed356',
    FAIL_COLOR: '#d23b0d',
    MS_IN_SEC: 1000,
    MS_IN_MIN: 60000,
    MS_IN_HR: 3600000,
    MS_IN_DAY: 86400000,

    EDITOR_PLACEHOLDER_POST: '<p>Write your new post...</p>',
    EDITOR_PLACEHOLDER_BIO: '<p>Write a short description of yourself...</p>',

    TERMS_AND_CONDITIONS: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce egestas libero non odio venenatis,
    vitae posuere erat facilisis. Curabitur consectetur pulvinar dictum. Vivamus ac mauris ornare leo
    interdum malesuada. Nam fermentum blandit turpis sed malesuada. Ut pellentesque est in purus posuere
    semper. Mauris imperdiet et felis at porttitor. Vivamus scelerisque nisl sed sem scelerisque convallis.

    Morbi congue molestie lacinia. Aenean vulputate nec neque at vulputate. Aenean tempus euismod tellus, et
     convallis sapien congue vitae. Sed ultricies velit sed est auctor, non egestas augue malesuada. Pellentesque
     dignissim velit vitae nibh iaculis egestas. Aliquam erat volutpat. Quisque porttitor, lacus posuere iaculis
     fermentum, lectus lectus maximus nisi, placerat vulputate justo risus id arcu. Proin nec tincidunt magna.
     Ut quis pellentesque eros, in commodo odio. Aliquam interdum ex efficitur purus fermentum, sed consequat
     est pharetra. Praesent eleifend turpis non sem consectetur, eget fermentum libero vulputate. Maecenas in
     tellus ultrices ex sodales facilisis vel eget odio.

    Donec lacinia eleifend viverra. Praesent non risus ac dolor rutrum imperdiet non sed nunc. Aenean faucibus
    condimentum porttitor. Fusce facilisis nulla ac pulvinar mattis. Ut nec dolor quis ligula molestie laoreet.
    Mauris eget scelerisque elit. Nullam nec enim est. Quisque sit amet mauris sagittis, accumsan nulla vel, ornare neque.

    Morbi hendrerit elit ut lectus congue interdum. Aenean malesuada nisl eu lobortis pellentesque. In fermentum
    elit non sagittis fringilla. Mauris viverra elit et ex vulputate commodo. Fusce a lorem ut enim convallis
    lobortis quis in orci. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec consequat, libero
    at euismod elementum, nisl libero varius urna, eget luctus velit magna non augue. Mauris ullamcorper lorem
    metus, sed tempor est efficitur id. Sed interdum libero vel purus tincidunt ullamcorper. Suspendisse nibh diam,
    pharetra sed nulla nec, congue consequat felis.

    Pellentesque mollis vulputate lorem, iaculis eleifend quam aliquam id. Pellentesque dictum est eget felis feugiat,
     quis ultrices eros mollis. Vestibulum maximus orci gravida enim lobortis accumsan. Quisque luctus diam sed nulla
      molestie ullamcorper. Mauris lobortis tincidunt sem, ut commodo tortor porttitor eget. Duis suscipit ornare
      justo non gravida. Donec sed lectus sit amet nisi congue blandit sit amet ac leo. Sed nec congue lorem. Suspendisse
       id bibendum augue, sed porttitor nibh. Sed nibh purus, iaculis non congue ac, blandit iaculis odio. Integer
       aliquet ultrices orci, in tempus lacus suscipit ut. Maecenas egestas mi vel semper tincidunt. Nam mi mi,
       elementum sit amet tempor eu, convallis vitae nulla. Pellentesque dui quam, convallis at pellentesque nec,
        aliquet non neque.

    Morbi molestie dictum nisl sed convallis. Ut pharetra rhoncus leo molestie egestas. Donec justo nisi, convallis
     vitae tristique vitae, consectetur eu diam. Sed fermentum tristique dolor. Maecenas varius augue eu porta viverra.
      Donec posuere mauris eu porttitor ornare. Aliquam erat volutpat. Donec convallis felis turpis, at consectetur
      eros consectetur et. Duis varius neque sed egestas ullamcorper. Quisque vitae dui pulvinar nisi fermentum gravida
      quis eget velit. Mauris velit massa, semper ut laoreet iaculis, mattis sit amet justo. Nam suscipit a sem sed
      consequat. Quisque vitae pretium urna. Donec sapien quam, bibendum id est sit amet, imperdiet imperdiet nisi.

    Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut aliquam justo in odio
    fringilla, vel sollicitudin neque accumsan. Cras imperdiet dolor purus, suscipit porttitor erat molestie sit amet.
    Etiam bibendum augue non dolor tincidunt, ac fermentum leo congue. Etiam eget velit pharetra, molestie lacus eget,
    ullamcorper magna. Nullam auctor dolor quis arcu ultricies, at facilisis libero eleifend. Nullam fermentum, lorem
    ac dictum ornare, nisl est euismod dui, quis molestie arcu metus rutrum ligula. Praesent id tellus vehicula, euismod
    ante nec, pharetra diam. Praesent vitae elit facilisis, malesuada neque sit amet, gravida nisi. Duis ornare suscipit
    erat, nec congue risus laoreet in. Aliquam semper vestibulum nulla, sed fringilla quam ultricies et. Duis pretium
    feugiat nisl, vel facilisis magna finibus in. Nulla facilisi. Etiam pharetra nibh vitae leo tincidunt, eu facilisis odio pulvinar.
    `
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
