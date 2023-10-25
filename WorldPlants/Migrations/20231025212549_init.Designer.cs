﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WorldPlants.Entities;

#nullable disable

namespace WorldPlants.Migrations
{
    [DbContext(typeof(WorldPlantsDbContext))]
    [Migration("20231025212549_init")]
    partial class init
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("WorldPlants.Entities.ActionType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("SpaceId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("StandardType")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("SpaceId");

                    b.ToTable("ActionTypes");
                });

            modelBuilder.Entity("WorldPlants.Entities.ActiveTask", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("ActionDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("ActionTypeId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Interval")
                        .HasColumnType("int");

                    b.Property<int>("PartOfTheDay")
                        .HasColumnType("int");

                    b.Property<Guid>("PlantId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("ActionTypeId");

                    b.HasIndex("PlantId");

                    b.ToTable("ActiveTasks");
                });

            modelBuilder.Entity("WorldPlants.Entities.DefaultSite", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("CanChangeHasRoof")
                        .HasColumnType("bit");

                    b.Property<int>("ColdPeriodMaxTemperature")
                        .HasColumnType("int");

                    b.Property<int>("ColdPeriodMinTemperature")
                        .HasColumnType("int");

                    b.Property<bool>("HasRoof")
                        .HasColumnType("bit");

                    b.Property<int>("Location")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("WarmPeriodMaxTemperature")
                        .HasColumnType("int");

                    b.Property<int>("WarmPeriodMinTemperature")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("DefaultSites");
                });

            modelBuilder.Entity("WorldPlants.Entities.Plant", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("AdditionalDescription")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ExternalId")
                        .HasColumnType("int");

                    b.Property<string>("ImageName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PlantHeight")
                        .HasColumnType("int");

                    b.Property<int>("PotHeight")
                        .HasColumnType("int");

                    b.Property<int>("PotWidth")
                        .HasColumnType("int");

                    b.Property<int>("UserSiteId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserSiteId");

                    b.ToTable("Plants");
                });

            modelBuilder.Entity("WorldPlants.Entities.PlantNote", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("CreationDate")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Note")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("PlantId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("PlantId");

                    b.ToTable("PlantNotes");
                });

            modelBuilder.Entity("WorldPlants.Entities.PlantTaskHistory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ExecutionDate")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("PlantId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("TaskType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("PlantId");

                    b.ToTable("PlantTasksHistory");
                });

            modelBuilder.Entity("WorldPlants.Entities.QrCode", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("PlantId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PlantName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("SpaceId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.ToTable("QrCodes");
                });

            modelBuilder.Entity("WorldPlants.Entities.Space", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.ToTable("Spaces");
                });

            modelBuilder.Entity("WorldPlants.Entities.SunExposure", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ForSiteType")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("SunScale")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("SunExposures");
                });

            modelBuilder.Entity("WorldPlants.Entities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("AccountType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<DateTime>("LastEmailReminderSendDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("LastSMSReminderSendDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("SpaceId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("SpaceId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("WorldPlants.Entities.UserSettings", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("CanAddPlants")
                        .HasColumnType("bit");

                    b.Property<bool>("CanAddSites")
                        .HasColumnType("bit");

                    b.Property<bool>("CanCreateCustomTasks")
                        .HasColumnType("bit");

                    b.Property<bool>("CanEditPlants")
                        .HasColumnType("bit");

                    b.Property<bool>("CanEditSites")
                        .HasColumnType("bit");

                    b.Property<bool>("CanMovePlants")
                        .HasColumnType("bit");

                    b.Property<bool>("CanRemovePlants")
                        .HasColumnType("bit");

                    b.Property<bool>("CanRemoveSites")
                        .HasColumnType("bit");

                    b.Property<bool>("CustomTasksEmailReminder")
                        .HasColumnType("bit");

                    b.Property<bool>("CustomTasksSmsReminder")
                        .HasColumnType("bit");

                    b.Property<bool>("CutPlantsEmailReminder")
                        .HasColumnType("bit");

                    b.Property<bool>("CutPlantsSmsReminder")
                        .HasColumnType("bit");

                    b.Property<bool>("FertilizePlantsEmailReminder")
                        .HasColumnType("bit");

                    b.Property<bool>("FertilizePlantsSmsReminder")
                        .HasColumnType("bit");

                    b.Property<bool>("MistPlantsEmailReminder")
                        .HasColumnType("bit");

                    b.Property<bool>("MistPlantsSmsReminder")
                        .HasColumnType("bit");

                    b.Property<bool>("ReplantPlantsEmailReminder")
                        .HasColumnType("bit");

                    b.Property<bool>("ReplantPlantsSmsReminder")
                        .HasColumnType("bit");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("WaterPlantsEmailReminder")
                        .HasColumnType("bit");

                    b.Property<bool>("WaterPlantsSmsReminder")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("UserSettings");
                });

            modelBuilder.Entity("WorldPlants.Entities.UserSite", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("CanChangeHasRoof")
                        .HasColumnType("bit");

                    b.Property<int>("ColdPeriodMaxTemperature")
                        .HasColumnType("int");

                    b.Property<int>("ColdPeriodMinTemperature")
                        .HasColumnType("int");

                    b.Property<bool>("HasRoof")
                        .HasColumnType("bit");

                    b.Property<int>("Location")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("SpaceId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("SunExposureId")
                        .HasColumnType("int");

                    b.Property<int>("WarmPeriodMaxTemperature")
                        .HasColumnType("int");

                    b.Property<int>("WarmPeriodMinTemperature")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("SpaceId");

                    b.HasIndex("SunExposureId");

                    b.ToTable("UserSites");
                });

            modelBuilder.Entity("WorldPlants.Entities.ActionType", b =>
                {
                    b.HasOne("WorldPlants.Entities.Space", null)
                        .WithMany("ActionTypes")
                        .HasForeignKey("SpaceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("WorldPlants.Entities.ActiveTask", b =>
                {
                    b.HasOne("WorldPlants.Entities.ActionType", "ActionType")
                        .WithMany()
                        .HasForeignKey("ActionTypeId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("WorldPlants.Entities.Plant", "Plant")
                        .WithMany("ActiveTasks")
                        .HasForeignKey("PlantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ActionType");

                    b.Navigation("Plant");
                });

            modelBuilder.Entity("WorldPlants.Entities.Plant", b =>
                {
                    b.HasOne("WorldPlants.Entities.UserSite", "UserSite")
                        .WithMany("Plants")
                        .HasForeignKey("UserSiteId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("UserSite");
                });

            modelBuilder.Entity("WorldPlants.Entities.PlantNote", b =>
                {
                    b.HasOne("WorldPlants.Entities.Plant", "Plant")
                        .WithMany("PlantNotes")
                        .HasForeignKey("PlantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Plant");
                });

            modelBuilder.Entity("WorldPlants.Entities.PlantTaskHistory", b =>
                {
                    b.HasOne("WorldPlants.Entities.Plant", "Plant")
                        .WithMany("TasksHistory")
                        .HasForeignKey("PlantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Plant");
                });

            modelBuilder.Entity("WorldPlants.Entities.User", b =>
                {
                    b.HasOne("WorldPlants.Entities.Space", "Space")
                        .WithMany("Users")
                        .HasForeignKey("SpaceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Space");
                });

            modelBuilder.Entity("WorldPlants.Entities.UserSettings", b =>
                {
                    b.HasOne("WorldPlants.Entities.User", "User")
                        .WithOne("UserSettings")
                        .HasForeignKey("WorldPlants.Entities.UserSettings", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("WorldPlants.Entities.UserSite", b =>
                {
                    b.HasOne("WorldPlants.Entities.Space", "Space")
                        .WithMany("UserSites")
                        .HasForeignKey("SpaceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WorldPlants.Entities.SunExposure", "SunExposure")
                        .WithMany()
                        .HasForeignKey("SunExposureId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Space");

                    b.Navigation("SunExposure");
                });

            modelBuilder.Entity("WorldPlants.Entities.Plant", b =>
                {
                    b.Navigation("ActiveTasks");

                    b.Navigation("PlantNotes");

                    b.Navigation("TasksHistory");
                });

            modelBuilder.Entity("WorldPlants.Entities.Space", b =>
                {
                    b.Navigation("ActionTypes");

                    b.Navigation("UserSites");

                    b.Navigation("Users");
                });

            modelBuilder.Entity("WorldPlants.Entities.User", b =>
                {
                    b.Navigation("UserSettings")
                        .IsRequired();
                });

            modelBuilder.Entity("WorldPlants.Entities.UserSite", b =>
                {
                    b.Navigation("Plants");
                });
#pragma warning restore 612, 618
        }
    }
}