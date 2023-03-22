using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorldPlants.Migrations
{
    /// <inheritdoc />
    public partial class changedRelationInSpace : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_SpaceId",
                table: "Users");

            migrationBuilder.CreateIndex(
                name: "IX_Users_SpaceId",
                table: "Users",
                column: "SpaceId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_SpaceId",
                table: "Users");

            migrationBuilder.CreateIndex(
                name: "IX_Users_SpaceId",
                table: "Users",
                column: "SpaceId",
                unique: true);
        }
    }
}
