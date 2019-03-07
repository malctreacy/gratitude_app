# gratitude_app

Description: Native progresive web app designed to mimic the peer-reviewed benefit of this Harvard study: 
  https://www.health.harvard.edu/newsletter_article/in-praise-of-gratitude

Functionality: 
- Cloud-based user Authentication + Profile Management
- Gratitude Prompts (AI generated) + gratitude timeline.

Front-End: 
- Ionic v4 + Capacitor (https://capacitor.ionicframework.com/docs/getting-started/with-ionic/)
- Angular

Back-End:
- AngularFire
- Firebase
- Naive Bayes classifier.

HOW TO RUN:
in /src folder, run "npm install"
run "ionic lab" 

TODO: 
- (Done) Implement onboarding notification settings, and integrate with main settings. 
- (Done) Finish implementing local notifications
- (Done) Integrate Raj's ML algo. into firebase.
- (Done) Create news service to inject "featured content" into timeline. 
- (Done) Implement points system to keep track of user data and change growth icons.
- (Done) Fix event detail page to detail gratitude statement.
