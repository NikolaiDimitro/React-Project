using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

[SetUp]
public void SetUp()
{
    ChromeOptions options = new ChromeOptions();
    options.AddArgument("headless");
    options.AddArgument("no-sandbox");
    options.AddArgument("disable-dev-shm-usage");
    options.AddArgument("disable-gpu");
    options.AddArgument("windows-size=1920x1280");

    driver = new ChromeDriver(options);
    js = (IJavaScriptExecutor)driver;
    vars = new Dictionary<string, object>();
}

[TearDown]
protected void TearDown()
{
    driver.Quit();
}

[Test]
public void tC01IfUserIsInvalidTryAgain()
{
    driver.Navigate().GoToUrl("https://www.saucedemo.com/");
    driver.Manage().Window.Size = new System.Drawing.Size(1552, 832);

    driver.FindElement(By.CssSelector("*[data-test=\"username\"]")).SendKeys("user123");
    driver.FindElement(By.CssSelector("*[data-test=\"password\"]")).SendKeys("secret_sauce");
    driver.FindElement(By.CssSelector("*[data-test=\"login-button\"]")).Click();

    var errorMessage = driver.FindElement(By.CssSelector("*[data-test=\"error\"]")).Text;

    if (errorMessage == "Epic sadface: Username and password do not match any user in this service")
    {
        Console.WriteLine("Wrong username");

        driver.FindElement(By.CssSelector("*[data-test=\"username\"]")).Clear();
        driver.FindElement(By.CssSelector("*[data-test=\"username\"]")).SendKeys("standard_user");
        driver.FindElement(By.CssSelector("*[data-test=\"login-button\"]")).Click();

        Assert.That(driver.FindElement(By.CssSelector("*[data-test=\"title\"]")).Text, Is.EqualTo("Products"));
        Console.WriteLine("Successful login");
    }
}
