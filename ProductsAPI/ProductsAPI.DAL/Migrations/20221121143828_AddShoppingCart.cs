using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProductsAPI.DAL.Migrations
{
    public partial class AddShoppingCart : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ApiUserProduct_Products_ProductsId",
                table: "ApiUserProduct");

            migrationBuilder.RenameColumn(
                name: "ProductsId",
                table: "ApiUserProduct",
                newName: "FavoritesId");

            migrationBuilder.RenameIndex(
                name: "IX_ApiUserProduct_ProductsId",
                table: "ApiUserProduct",
                newName: "IX_ApiUserProduct_FavoritesId");

            migrationBuilder.CreateTable(
                name: "Carts",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Carts", x => new { x.UserId, x.ProductId });
                    table.ForeignKey(
                        name: "FK_Carts_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Carts_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "5d17250c-03e9-4f5c-8230-30f10a50fd9a");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "48f3acfb-3ff6-45b8-a463-46320df899b9");

            migrationBuilder.CreateIndex(
                name: "IX_Carts_ProductId",
                table: "Carts",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_ApiUserProduct_Products_FavoritesId",
                table: "ApiUserProduct",
                column: "FavoritesId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ApiUserProduct_Products_FavoritesId",
                table: "ApiUserProduct");

            migrationBuilder.DropTable(
                name: "Carts");

            migrationBuilder.RenameColumn(
                name: "FavoritesId",
                table: "ApiUserProduct",
                newName: "ProductsId");

            migrationBuilder.RenameIndex(
                name: "IX_ApiUserProduct_FavoritesId",
                table: "ApiUserProduct",
                newName: "IX_ApiUserProduct_ProductsId");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "beebc323-4a7d-4aa3-a699-2501a3556620");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "246a0529-462f-491c-92c0-8edff79c2dde");

            migrationBuilder.AddForeignKey(
                name: "FK_ApiUserProduct_Products_ProductsId",
                table: "ApiUserProduct",
                column: "ProductsId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
