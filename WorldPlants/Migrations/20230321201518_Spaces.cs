using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorldPlants.Migrations
{
    /// <inheritdoc />
    public partial class Spaces : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Space_SpaceId",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Space",
                table: "Space");

            migrationBuilder.RenameTable(
                name: "Space",
                newName: "Spaces");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Spaces",
                table: "Spaces",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Spaces_SpaceId",
                table: "Users",
                column: "SpaceId",
                principalTable: "Spaces",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Spaces_SpaceId",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Spaces",
                table: "Spaces");

            migrationBuilder.RenameTable(
                name: "Spaces",
                newName: "Space");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Space",
                table: "Space",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Space_SpaceId",
                table: "Users",
                column: "SpaceId",
                principalTable: "Space",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
