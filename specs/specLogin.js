
// spec.js
describe('Login Page Test', function() {

    browser.ignoreSynchronization = true;
    
    var login_page = require('../pages/loginPage.js');
    var nav = require('../utils/nav.js');

    beforeEach(function() {
      browser.get('http://automationpractice.com/index.php?controller=authentication&back=my-account');
      });

// Positive Tests


    it('user can login with a valid email and valid password by clicking Sign In button', function() {
        login_page.loginStore('mayaharari26@gmail.com', 'Mh7969333', 'SignIn');
        expect(browser.getTitle()).toContain('My account');
        nav.clickSignOut();
        expect(browser.getTitle()).toContain('Login');
      });
    
    it('user can login with a valid email and valid password by clicking Enter key', function() {
        login_page.loginStore('mayaharari26@gmail.com', 'Mh7969333', 'SignIn');
        expect(browser.getTitle()).toContain('My account');
        nav.clickSignOut();
        expect(browser.getTitle()).toContain('Login');
      });

    it('password is encrypted', function(){
        expect(login_page.getPasswordElemType()).toEqual("password");
      });

    it('click forgot your password', function(){
        login_page.clickForgotPassword();
        expect(browser.getTitle()).toContain('Forgot your password');
      });
    
    it('should be able to login simultaneously from different browsers with different users', function(){
      browser.executeScript('window.open("http://automationpractice.com/index.php?controller=authentication&back=my-account", "second-window")');
      browser.getAllWindowHandles().then(function (handles) {

        var originalHandle = handles[0];
        var secondHandle = handles[1];  
        browser.switchTo().window(secondHandle);
        login_page.loginStore('mayah@gmail.com', 'Mh7969333', 'SignIn');
        browser.switchTo().window(originalHandle);
        login_page.loginStore('mayaharari26@gmail.com', 'Mh7969333', 'SignIn');
        nav.clickSignOut();
      });     
    });


// Negative Tests

    it('user is not able to login with valid user  and invalid password', function() {
        login_page.loginStore('mayaharari26@gmail.com', '12345', 'SignIn');
        login_page.validateErrorIsThrown(login_page.getError('Authentication'));
       });

    it('user is not able to login with wrong user and valid password', function() {
        login_page.loginStore('mayaharari26@gmail.co', 'Mh7969333', 'SignIn');
        login_page.validateErrorIsThrown(login_page.getError('Authentication'));
       });
      
    it('user is not able to login with wrong user and wrong password', function() {
        login_page.loginStore('mayaharari26@gmail.co', '123456', 'SignIn');
        login_page.validateErrorIsThrown(login_page.getError('Authentication'));
       });

    it('should get indication when email is blank', function() {
      login_page.enterEmail('');
      browser.actions().sendKeys(protractor.Key.TAB).perform();
      login_page.validateErrorTextBoxColor('Email');
    });

    it('should get indication when email address is invalid', function() {
      login_page.enterEmail('mayaharari26gmail.com');
      browser.actions().sendKeys(protractor.Key.TAB).perform();
      login_page.validateErrorTextBoxColor('Email');
     });

    //Maya - there is a defect - there is no indication only an error after clicking signIn
    it('should get indication when password is blank', function() {
      login_page.enterPassword('');
      browser.actions().sendKeys(protractor.Key.TAB).perform();
      login_page.validateErrorTextBoxColor('Password');
     });
  
    it('should get proper error when email is blank', function() {
      login_page.loginStore('', 'Mh7969333', 'SignIn');
      login_page.validateErrorIsThrown(login_page.getError('Blank Email'));
    });
    
    it('should get proper error when pasowrd is blank', function() {
      login_page.loginStore('mayaharari26@gmail.com', '', 'SignIn');
      login_page.validateErrorIsThrown(login_page.getError('Blank Password'));
    });

    it('should get proper error when trying to sign in with invalid email address', function() {
      login_page.loginStore('mayaharari26gmail.com', 'Mh7969333', 'SignIn');
      login_page.validateErrorIsThrown(login_page.getError('Invalid Email'));
    });

  });