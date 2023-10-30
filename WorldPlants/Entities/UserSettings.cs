// Ignore Spelling: Sms

namespace WorldPlants.Entities
{
    public class UserSettings
    {
        public Guid Id { get; set; }
        // Reminders settings
        public bool WaterPlantsEmailReminder { get; set; }
        public bool WaterPlantsSmsReminder { get; set; }
        public bool FertilizePlantsEmailReminder { get; set; }
        public bool FertilizePlantsSmsReminder { get; set; }
        public bool CutPlantsEmailReminder { get; set; }
        public bool CutPlantsSmsReminder { get; set; }
        public bool ReplantPlantsEmailReminder { get; set; }
        public bool ReplantPlantsSmsReminder { get; set; }
        public bool MistPlantsEmailReminder { get; set; }
        public bool MistPlantsSmsReminder { get; set; }
        public bool CustomTasksEmailReminder { get; set; }
        public bool CustomTasksSmsReminder { get; set; }
        // Permissions
        public bool CanMovePlants { get; set; }
        public bool CanAddPlants { get; set; }
        public bool CanRemovePlants { get; set;}
        public bool CanEditPlants { get; set; }
        public bool CanAddSites { get; set; }
        public bool CanRemoveSites { get; set; }
        public bool CanEditSites { get; set; }
        public bool CanCreateCustomActionTypes { get; set; }
        public bool CanEditCustomActionTypes { get; set; }
        public bool CanDeleteCustomActionTypes { get; set; }

        public virtual User User { get; set; }
        public Guid UserId { get; set; }

    }
}