var nav = function(){
    
    var signOutBtn = element(by.css(`a[title="Log me out"]`));

    this.clickSignOut = function(){
        signOutBtn.click();
    };
};

module.exports = new nav();