import LoginPage from '../pageobjects/login.page';

describe("Login Section", () => {
  it("should display logo and login form", async () => {
    await LoginPage.open();
    const logo = await $('img[alt="Orel IT Logo"]');
    const title = await $("h1=Login to your account");
    const signupLink = await $("a=Sign up");
    await expect(logo).toBeDisplayed();
    await expect(title).toBeDisplayed();
    await expect(signupLink).toBeDisplayed();
  });

  it("should show validation errors when submitting empty form", async () => {
    await LoginPage.open();
    await LoginPage.btnSubmit.click();
    // Adjust selectors below to match your actual error message elements/classes
    const usernameError = await $("#username ~ .error-message");
    const passwordError = await $("#password ~ .error-message");
    await expect(usernameError).toBeDisplayed();
    await expect(passwordError).toBeDisplayed();
  });
});
