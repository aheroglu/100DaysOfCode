using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Migration_1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Users_CreateFromId",
                table: "Employees");

            migrationBuilder.RenameColumn(
                name: "CreateFromId",
                table: "Employees",
                newName: "CreatedFromId");

            migrationBuilder.RenameIndex(
                name: "IX_Employees_CreateFromId",
                table: "Employees",
                newName: "IX_Employees_CreatedFromId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Users_CreatedFromId",
                table: "Employees",
                column: "CreatedFromId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Users_CreatedFromId",
                table: "Employees");

            migrationBuilder.RenameColumn(
                name: "CreatedFromId",
                table: "Employees",
                newName: "CreateFromId");

            migrationBuilder.RenameIndex(
                name: "IX_Employees_CreatedFromId",
                table: "Employees",
                newName: "IX_Employees_CreateFromId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Users_CreateFromId",
                table: "Employees",
                column: "CreateFromId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
