using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using ProductsAPI.DAL.Data;
using ProductsAPI.DAL.JWT;
using ProductsAPI.DAL.Models.Account;
using ProductsAPI.Service.CartService;
using ProductsAPI.Service.CategoryService;
using ProductsAPI.Service.LoginService;
using ProductsAPI.Service.OptionService;
using ProductsAPI.Service.ProductService;
using ProductsAPI.Service.PropertyService;
using ProductsAPI.Service.RegisterService;
using ProductsAPI.Service.RoleService;
using ProductsAPI.Service.UserService;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);//
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ProductsDbContext>();

builder.Services.AddIdentity<ApiUser, ApiRole>(options =>
        options.User.RequireUniqueEmail = true)
        .AddEntityFrameworkStores<ProductsDbContext>()
        .AddDefaultTokenProviders();

builder.Services.Configure<CookiePolicyOptions>(options =>
{
    options.CheckConsentNeeded = context => true;
    options.MinimumSameSitePolicy = SameSiteMode.None;
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {   
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience =true,
            ValidateIssuerSigningKey = false,
            ValidIssuer = "ProductsAPI",
            ValidAudience = "ProductsAPI",
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero,
            IssuerSigningKey = JWTConfig.SymmetricKey
        };
    });

builder.Services.AddCors(o => o.AddPolicy("corsFixLocalhost", builder =>
{
    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();
}));

builder.Services.AddAuthentication();

builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IRegisterService, RegisterService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IRoleService, RoleService>();
builder.Services.AddScoped<ILoginService, LoginService>();
builder.Services.AddScoped<ICartService, CartService>();
builder.Services.AddScoped<IPropertyService, PropertyService>();
builder.Services.AddScoped<IOptionService, OptionService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("corsFixLocalhost");
app.UseHttpsRedirection();
app.UseCookiePolicy();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
