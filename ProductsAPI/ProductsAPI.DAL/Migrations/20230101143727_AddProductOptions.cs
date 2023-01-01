using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProductsAPI.DAL.Migrations
{
    public partial class AddProductOptions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OptionProperty_Option_OptionsId",
                table: "OptionProperty");

            migrationBuilder.DropForeignKey(
                name: "FK_OptionProperty_Property_PropertiesId",
                table: "OptionProperty");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductProperty_Property_PropertiesId",
                table: "ProductProperty");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Property",
                table: "Property");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Option",
                table: "Option");

            migrationBuilder.RenameTable(
                name: "Property",
                newName: "Properties");

            migrationBuilder.RenameTable(
                name: "Option",
                newName: "Options");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Properties",
                table: "Properties",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Options",
                table: "Options",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "OptionProduct",
                columns: table => new
                {
                    OptionsId = table.Column<int>(type: "int", nullable: false),
                    ProductsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OptionProduct", x => new { x.OptionsId, x.ProductsId });
                    table.ForeignKey(
                        name: "FK_OptionProduct_Options_OptionsId",
                        column: x => x.OptionsId,
                        principalTable: "Options",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OptionProduct_Products_ProductsId",
                        column: x => x.ProductsId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "590fa8c5-8443-4d65-8bcc-48f92045dac3");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "450e637b-e655-4a7c-83e9-2611e4c00f77");

            migrationBuilder.CreateIndex(
                name: "IX_OptionProduct_ProductsId",
                table: "OptionProduct",
                column: "ProductsId");

            migrationBuilder.AddForeignKey(
                name: "FK_OptionProperty_Options_OptionsId",
                table: "OptionProperty",
                column: "OptionsId",
                principalTable: "Options",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OptionProperty_Properties_PropertiesId",
                table: "OptionProperty",
                column: "PropertiesId",
                principalTable: "Properties",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductProperty_Properties_PropertiesId",
                table: "ProductProperty",
                column: "PropertiesId",
                principalTable: "Properties",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OptionProperty_Options_OptionsId",
                table: "OptionProperty");

            migrationBuilder.DropForeignKey(
                name: "FK_OptionProperty_Properties_PropertiesId",
                table: "OptionProperty");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductProperty_Properties_PropertiesId",
                table: "ProductProperty");

            migrationBuilder.DropTable(
                name: "OptionProduct");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Properties",
                table: "Properties");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Options",
                table: "Options");

            migrationBuilder.RenameTable(
                name: "Properties",
                newName: "Property");

            migrationBuilder.RenameTable(
                name: "Options",
                newName: "Option");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Property",
                table: "Property",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Option",
                table: "Option",
                column: "Id");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "1319321a-ac1c-466c-a63d-d74af8f91932");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "0bddf6b9-b3d3-4a23-8c86-ea10e172d359");

            migrationBuilder.AddForeignKey(
                name: "FK_OptionProperty_Option_OptionsId",
                table: "OptionProperty",
                column: "OptionsId",
                principalTable: "Option",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OptionProperty_Property_PropertiesId",
                table: "OptionProperty",
                column: "PropertiesId",
                principalTable: "Property",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductProperty_Property_PropertiesId",
                table: "ProductProperty",
                column: "PropertiesId",
                principalTable: "Property",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
