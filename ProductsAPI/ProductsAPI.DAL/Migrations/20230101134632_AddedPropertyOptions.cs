using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProductsAPI.DAL.Migrations
{
    public partial class AddedPropertyOptions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Option",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Option", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OptionProperty",
                columns: table => new
                {
                    OptionsId = table.Column<int>(type: "int", nullable: false),
                    PropertiesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OptionProperty", x => new { x.OptionsId, x.PropertiesId });
                    table.ForeignKey(
                        name: "FK_OptionProperty_Option_OptionsId",
                        column: x => x.OptionsId,
                        principalTable: "Option",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OptionProperty_Property_PropertiesId",
                        column: x => x.PropertiesId,
                        principalTable: "Property",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

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

            migrationBuilder.CreateIndex(
                name: "IX_OptionProperty_PropertiesId",
                table: "OptionProperty",
                column: "PropertiesId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OptionProperty");

            migrationBuilder.DropTable(
                name: "Option");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "5b23ed8f-9416-4af5-ab54-4e7ea2f3cad7");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "043752be-0652-45e1-96f4-4a818032918f");
        }
    }
}
