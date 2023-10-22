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
                    CanChangeHasRoof = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DefaultSites", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "QrCodes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PlantName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PlantId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SpaceId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QrCodes", x => x.Id);
                });

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
                    LastEmailReminderSendDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastSMSReminderSendDate = table.Column<DateTime>(type: "datetime2", nullable: false),
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
                name: "UserSites",
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
                    SunExposureId = table.Column<int>(type: "int", nullable: false),
                    SpaceId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSites", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserSites_Spaces_SpaceId",
                        column: x => x.SpaceId,
                        principalTable: "Spaces",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserSites_SunExposures_SunExposureId",
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
                    WaterPlantsEmailReminder = table.Column<bool>(type: "bit", nullable: false),
                    WaterPlantsSmsReminder = table.Column<bool>(type: "bit", nullable: false),
                    FertilizePlantsEmailReminder = table.Column<bool>(type: "bit", nullable: false),
                    FertilizePlantsSmsReminder = table.Column<bool>(type: "bit", nullable: false),
                    CutPlantsEmailReminder = table.Column<bool>(type: "bit", nullable: false),
                    CutPlantsSmsReminder = table.Column<bool>(type: "bit", nullable: false),
                    ReplantPlantsEmailReminder = table.Column<bool>(type: "bit", nullable: false),
                    ReplantPlantsSmsReminder = table.Column<bool>(type: "bit", nullable: false),
                    MistPlantsEmailReminder = table.Column<bool>(type: "bit", nullable: false),
                    MistPlantsSmsReminder = table.Column<bool>(type: "bit", nullable: false),
                    CustomTasksEmailReminder = table.Column<bool>(type: "bit", nullable: false),
                    CustomTasksSmsReminder = table.Column<bool>(type: "bit", nullable: false),
                    CanMovePlants = table.Column<bool>(type: "bit", nullable: false),
                    CanAddPlants = table.Column<bool>(type: "bit", nullable: false),
                    CanRemovePlants = table.Column<bool>(type: "bit", nullable: false),
                    CanEditPlants = table.Column<bool>(type: "bit", nullable: false),
                    CanAddSites = table.Column<bool>(type: "bit", nullable: false),
                    CanRemoveSites = table.Column<bool>(type: "bit", nullable: false),
                    CanEditSites = table.Column<bool>(type: "bit", nullable: false),
                    CanCreateCustomTasks = table.Column<bool>(type: "bit", nullable: false),
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
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ExternalId = table.Column<int>(type: "int", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AdditionalDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PotWidth = table.Column<int>(type: "int", nullable: false),
                    PotHeight = table.Column<int>(type: "int", nullable: false),
                    PlantHeight = table.Column<int>(type: "int", nullable: false),
                    ImageName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserSiteId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Plants", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Plants_UserSites_UserSiteId",
                        column: x => x.UserSiteId,
                        principalTable: "UserSites",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ActiveTasks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ActionDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PartOfTheDay = table.Column<int>(type: "int", nullable: false),
                    ActionType = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Interval = table.Column<int>(type: "int", nullable: true),
                    PlantId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActiveTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActiveTasks_Plants_PlantId",
                        column: x => x.PlantId,
                        principalTable: "Plants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PlantNotes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Note = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreationDate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PlantId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlantNotes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlantNotes_Plants_PlantId",
                        column: x => x.PlantId,
                        principalTable: "Plants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PlantTasksHistory",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TaskType = table.Column<int>(type: "int", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ExecutionDate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PlantId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlantTasksHistory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlantTasksHistory_Plants_PlantId",
                        column: x => x.PlantId,
                        principalTable: "Plants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ActiveTasks_PlantId",
                table: "ActiveTasks",
                column: "PlantId");

            migrationBuilder.CreateIndex(
                name: "IX_PlantNotes_PlantId",
                table: "PlantNotes",
                column: "PlantId");

            migrationBuilder.CreateIndex(
                name: "IX_Plants_UserSiteId",
                table: "Plants",
                column: "UserSiteId");

            migrationBuilder.CreateIndex(
                name: "IX_PlantTasksHistory_PlantId",
                table: "PlantTasksHistory",
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

            migrationBuilder.CreateIndex(
                name: "IX_UserSites_SpaceId",
                table: "UserSites",
                column: "SpaceId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSites_SunExposureId",
                table: "UserSites",
                column: "SunExposureId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActiveTasks");

            migrationBuilder.DropTable(
                name: "DefaultSites");

            migrationBuilder.DropTable(
                name: "PlantNotes");

            migrationBuilder.DropTable(
                name: "PlantTasksHistory");

            migrationBuilder.DropTable(
                name: "QrCodes");

            migrationBuilder.DropTable(
                name: "UserSettings");

            migrationBuilder.DropTable(
                name: "Plants");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "UserSites");

            migrationBuilder.DropTable(
                name: "Spaces");

            migrationBuilder.DropTable(
                name: "SunExposures");
        }
    }
}
