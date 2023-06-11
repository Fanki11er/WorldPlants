using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorldPlants.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Spaces",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Spaces", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SunExposures",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ForSiteType = table.Column<int>(type: "int", nullable: false),
                    SunScale = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SunExposures", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    AccountType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SpaceId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Spaces_SpaceId",
                        column: x => x.SpaceId,
                        principalTable: "Spaces",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DefaultSites",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Location = table.Column<int>(type: "int", nullable: false),
                    WarmPeriodMinTemperature = table.Column<int>(type: "int", nullable: false),
                    WarmPeriodMaxTemperature = table.Column<int>(type: "int", nullable: false),
                    ColdPeriodMinTemperature = table.Column<int>(type: "int", nullable: false),
                    ColdPeriodMaxTemperature = table.Column<int>(type: "int", nullable: false),
                    HasRoof = table.Column<bool>(type: "bit", nullable: false),
                    CanChangeHasRoof = table.Column<bool>(type: "bit", nullable: false),
                    Discriminator = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SunExposureId = table.Column<int>(type: "int", nullable: true),
                    UserSpaceId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    SpaceId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DefaultSites", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DefaultSites_Spaces_SpaceId",
                        column: x => x.SpaceId,
                        principalTable: "Spaces",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DefaultSites_SunExposures_SunExposureId",
                        column: x => x.SunExposureId,
                        principalTable: "SunExposures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserSettings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ReceiveEmails = table.Column<bool>(type: "bit", nullable: false),
                    ReceiveSms = table.Column<bool>(type: "bit", nullable: false),
                    CanWaterPlants = table.Column<bool>(type: "bit", nullable: false),
                    CanMistPlants = table.Column<bool>(type: "bit", nullable: false),
                    CanFertilizePlants = table.Column<bool>(type: "bit", nullable: false),
                    CanRepotPlants = table.Column<bool>(type: "bit", nullable: false),
                    CanMovePlants = table.Column<bool>(type: "bit", nullable: false),
                    CanAddPlants = table.Column<bool>(type: "bit", nullable: false),
                    CanRemovePlants = table.Column<bool>(type: "bit", nullable: false),
                    CanEditPlants = table.Column<bool>(type: "bit", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSettings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserSettings_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Plants",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserSiteId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Plants", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Plants_DefaultSites_UserSiteId",
                        column: x => x.UserSiteId,
                        principalTable: "DefaultSites",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Task",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DueDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PlantId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Task", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Task_Plants_PlantId",
                        column: x => x.PlantId,
                        principalTable: "Plants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DefaultSites_SpaceId",
                table: "DefaultSites",
                column: "SpaceId");

            migrationBuilder.CreateIndex(
                name: "IX_DefaultSites_SunExposureId",
                table: "DefaultSites",
                column: "SunExposureId");

            migrationBuilder.CreateIndex(
                name: "IX_Plants_UserSiteId",
                table: "Plants",
                column: "UserSiteId");

            migrationBuilder.CreateIndex(
                name: "IX_Task_PlantId",
                table: "Task",
                column: "PlantId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_SpaceId",
                table: "Users",
                column: "SpaceId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSettings_UserId",
                table: "UserSettings",
                column: "UserId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Task");

            migrationBuilder.DropTable(
                name: "UserSettings");

            migrationBuilder.DropTable(
                name: "Plants");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "DefaultSites");

            migrationBuilder.DropTable(
                name: "Spaces");

            migrationBuilder.DropTable(
                name: "SunExposures");
        }
    }
}
