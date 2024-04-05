# Mobile application installation

# React Native

## Prerequisites

- [Node.js](https://nodejs.org) (16.10.0) and npm (Recommended: Use [nvm](https://github.com/nvm-sh/nvm))
- [Watchman](https://facebook.github.io/watchman) (2.9.6)
- [Xcode](https://developer.apple.com/xcode) (13)
- [Cocoapods](https://cocoapods.org) (1.10.1)
- [JDK](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) ( > 11)
- [Android Studio and Android SDK](https://developer.android.com/studio) (4.2)

## Base dependencies

- [react](https://reactjs.org/) (17.0.2)
- [react-native](https://github.com/facebook/react-native#readme) (0.67.2)
- [react-native-community/geolocation](https://github.com/react-native-geolocation/react-native-geolocation#README.md) (2.0.2)
- [react-navigation/native-stack](https://github.com/software-mansion/react-native-screens#readme) (6.5.0)
- [react-native-fingerprint-scanner](https://github.com/hieuvp/react-native-fingerprint-scanner#readme) (6.0.0)
- [moment](https://momentjs.com/) (2.29.1)
- [recoil](https://recoiljs.org/) (2.29.1)

## Usage

## Project cloning

- For SSH ```git clone git@github.com:satschel/mobile.token.git```  
- For HTTPS ```git clone https://github.com/satschel/mobile.token.git``` 
- ```cd mobile-token```
- ```npm install```

- For iOS ```cd ios && pod install```
- For android ```cd android && ./gradlew clean``` 

## Run project

- ```npx react-native run-ios``` or 
  [follow this page](https://developer.apple.com/library/archive/documentation/ToolsLanguages/Conceptual/Xcode_Overview/BuildingYourApp.html) to run on iOS
- ```npx react-native run-android``` to run on android

Note: Please read the setup environments section that is below in this file for more information about the execution scripts.
## Git format

- Branch name : 
  - If creating a new feature then `feat-feature-name`
  - If fixing a bug then `fix-bug-name`

- Commits : 
  - If creating a feature then `feat(feature-name): this is my message`
  - If fixing a bugs then `fix(bug-name): this is my message`

## Git instructions

Add files using the command line or push an existing Git repository with the following command:

  - ```git add .```
  - ```git commit -m "feat(feature-name): this is my message"```
  - ```git push origin branch-name```

## Folder structure

The project follows a very simple project structure:

- `index.ts`: Entry point of your application as per React-Native standards.
- `src`: This folder is the main container of all the code inside your application.
  - `assets`: Asset folder to store all images, vectors, etc.
  - `components`: Folder to store any common component that you use through your app (such as a generic button)
  - `constants`: Folder to store any kind of constant that you have.
  - `hooks`: Folder to keep reusable hooks.
  - `states`: Folder to keep states of the project.
  - `@storybook`: Folder to keep reusable components.
  - `views`: Folder that contains all your application screens/features.
    - `Screen`: Each screen should be stored inside its folder and inside it a file for its code and a separate one for the styles and tests.
      - `Screen.tsx`
      - `Screen.styles.ts`
      - `index.tsx`
    - `routes`: to checkout routes
  - `App.ts`: Main component that starts your whole app.

## Setup environments

#### Android

A map associating builds with env files is already defined in `app/build.gradle` you can modify or add environments if needed.

For multiple enviroments to work you would need to change `-keep class [YOUR_PACKAGE_NAME].BuildConfig { *; }` on `proguard-rules.pro` file.

#### iOS

The basic idea in iOS is to have one scheme per environment file, so you can easily alternate between them.

To create a new scheme:

- In the Xcode menu, go to Product > Scheme > Edit Scheme
- Click Duplicate Scheme on the bottom
- Give it a proper name on the top left. For instance: "qa"
- Then edit the newly created scheme to make it use a different env file. From the same "manage scheme" window:

  Expand the "Build" tab on the left menu
  - Click "Pre-actions", and under the plus sign select "New Run Script Action"
  - Where it says "Type a script or drag a script file", type: `echo ".env.qa" > /tmp/envfile` replacing `.env.qa` with your file.
- Also, you will need to select the executable for the new schema:

  Expand the "Run" tab on the left menu
  - Under the "Executable" dropdown select the ".app" you would like to use for that schema

## Generate production version

These are the steps to generate `.apk`, `.aab` and `.ipa` files

### Android

1. Generate an upload key
2. Setting up gradle variables
3. Go to the android folder
4. Execute `./gradlew assemble[Env][BuildType]`

Note: You have three options to execute the project
`assemble:` Generates an apk that you can share with others.
`install:` When you want to test a release build on a connected device.
`bundle:` When you are uploading the app to the Play Store.

For more info please go to https://reactnative.dev/docs/signed-apk-android

### iOS

1. Go to the Xcode
2. Select the schema
3. Select 'Any iOS device' as target
4. Product -> Archive

For more info please go to https://reactnative.dev/docs/publishing-to-app-store

## Collaborate with your team

- [ ] [Invite team members and collaborators](https://docs.github.com/en/enterprise-cloud@latest/account-and-profile/setting-up-and-managing-your-github-user-account/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository)
- [ ] [Create a new pull request](https://docs.github.com/en/enterprise-cloud@latest/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)
- [ ] [Automatically close issues from pull requests](https://github.blog/2013-05-14-closing-issues-via-pull-requests/)
- [ ] [Enable merge request approvals](https://github.com/carlos-wong/gitlab-ce-carlos/blob/master/doc/user/project/merge_requests/merge_request_approvals.md)
- [ ] [Automatically merge when pipeline succeeds](https://github.com/gitlabhq/gitlabhq/blob/master/doc/user/project/merge_requests/merge_when_pipeline_succeeds.md)

## Test and Deploy

Use the built-in continuous integration in GitHub.

- [ ] [Get started with GitHub CI/CD](https://github.blog/2022-02-02-build-ci-cd-pipeline-github-actions-four-steps/)
- [ ] [Analyze your code for known vulnerabilities with Static Application Security Testing(SAST)](https://github.com/analysis-tools-dev/static-analysis)
- [ ] [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.github.com/en/enterprise-cloud@latest/actions/deployment/deploying-to-your-cloud-provider/deploying-to-amazon-elastic-container-service)
- [ ] [Set up protected environments](https://docs.github.com/en/enterprise-server@3.1/actions/deployment/targeting-different-environments/using-environments-for-deployment)
