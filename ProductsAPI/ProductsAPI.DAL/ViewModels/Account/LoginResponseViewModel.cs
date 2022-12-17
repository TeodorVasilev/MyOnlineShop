namespace ProductsAPI.DAL.ViewModels.Account
{
    public class LoginResponseViewModel
    {
        public LoginResponseViewModel(string token, string message)
        {
            this.Token = token;
            this.Message = message;
        }

        public string Token { get; set; }
        public string Message { get; set; }
    }
}
