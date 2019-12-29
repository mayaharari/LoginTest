
var login_page = function(){

    const authError = 'Authentication failed.';
    const blankEmailError = 'An email address required.';
    const blankPasswordError = 'Password is required.';
    const invalidEmaildError = 'Invalid email address.';
    const expectedBlankInputColor = 'rgba(241, 51, 64, 1)';
    const expectedBlankInputBackgroundColor = 'rgb(255, 241, 242)';

    var emailTextBox = element(by.id('email'));
    var passTextBox = element(by.id('passwd'));
    var signInBtn = element(by.id('SubmitLogin'));
    var signOutBtn = element(by.css(`a[title="Log me out"]`));
    var forgotPass = element(by.css(`a[title="Recover your forgotten password"]`));

    this.getError = function(error){
        switch (error){
            case 'Authentication':
                return authError;
                break;
            case 'Blank Email':
                return blankEmailError;
                break;
            case 'Blank Password':
                return blankPasswordError;
                break;
            case 'Invalid Email':
                return invalidEmaildError;
                break;
            default:
                console.log('no such error found');
        }
    };

    this.enterEmail = function(emailAddress){
        emailTextBox.clear();
        emailTextBox.sendKeys(emailAddress);
        expect(this.getEmailValue()).toBe(emailAddress);
    };

    this.enterPassword = function(password){
        passTextBox.clear();
        passTextBox.sendKeys(password);
        expect(this.getPasswordValue()).toBe(password);
    };

    this.clickSingInBtn = function(){
        signInBtn.click();
    };

    this.getEmailValue = function(){
        return emailTextBox.getAttribute('value');
    };

    this.getPasswordValue = function(){
        return passTextBox.getAttribute('value');
    };

    this.getPasswordElemType = function(){
        return passTextBox.getAttribute("type");
    };

    this.clickForgotPassword = function(){
        forgotPass.click();
    };

    this.clickEnterKey = function(){
        browser.actions().sendKeys(protractor.Key.RETURN).perform();
    }

    this.loginStore = async function(email, password, method) {
        this.enterEmail(email);
        this.enterPassword(password);
        if (method==="SignIn"){
          this.clickSingInBtn();
        } else if (method==="Key"){
          this.clickEnterKey();
        }
    };

    this.getBlankInputColor = function(textBox){
        if (textBox==='Email'){
            return emailTextBox.getCssValue('color');
        } else if (textBox==='Password'){
            return passTextBox.getCssValue('color');
        }
    };
    this.getBlankInputBackgroundColor = function(textBox){
        if (textBox==='Email'){
            return emailTextBox.getCssValue('background');
        } else if (textBox==='Password'){
            return passTextBox.getCssValue('background');
        }
    };
    
    this.validateErrorIsThrown = function(error){
        element.all(by.css('.alert ol li')).each(function(element, index) {
            element.getText().then(function (text) {
                expect(text).toBe(error);
            });
        });
    };

    this.validateErrorTextBoxColor = function(textBox){
        if (textBox==='Email'){
            expect(this.getBlankInputColor('Email')).toContain(expectedBlankInputColor);
            expect(this.getBlankInputBackgroundColor('Email')).toContain(expectedBlankInputBackgroundColor);
        } else if (textBox==='Password'){
            expect(this.getBlankInputColor('Password')).toContain(expectedBlankInputColor);
            expect(this.getBlankInputBackgroundColor('Password')).toContain(expectedBlankInputBackgroundColor);

        }
    };
};
module.exports = new login_page();