using AutoMapper;
using WorldPlants.Entities;
using WorldPlants.Exceptions;
using WorldPlants.Models.QrCodes;
using WorldPlants.Utilities;

namespace WorldPlants.Services
{
    public interface IQrCodesService
    {
        public void CreateQrCode(string plantId);
        public List<QrCodeDTO> GetQrCodes();
        public void DeleteQrCode(int id);
        public void DeleteUserQrCodes();
    }
    public class QrCodesService: IQrCodesService
    {
        private readonly IUtilities _utilities;
        private readonly WorldPlantsDbContext _dbContext;
        private readonly IMapper _mapper;
        public QrCodesService(
            IUtilities utilities,
            WorldPlantsDbContext dbContext,
            IMapper mapper
            )
        {
            _utilities = utilities;
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public void CreateQrCode(string plantId)
        {
            var spaceId = _utilities.GetUserSpaceId();

           var existingCodesCounter = _dbContext
                .QrCodes
                .Where(qr => qr.SpaceId.ToString() == spaceId )
                .Count();
           if(existingCodesCounter == 20 )
            {
                throw new MaxNumberOfQrCodesException("Osiągnięto maksymalną liczbę kodów");
            }
           var plant =  _utilities.FindPlant(plantId);

            QrCode qrCode = new()
            {
                PlantId = plant.Id.ToString(),
                PlantName = plant.Name,
                SpaceId = plant.UserSite.SpaceId
            };

            _dbContext.QrCodes.Add(qrCode);

            _utilities.SaveChangesToDatabase();
        }

        public List<QrCodeDTO> GetQrCodes()
        {
            var spaceId = _utilities.GetUserSpaceId();

            var qrCodes = _dbContext.QrCodes.Where(qc => qc.SpaceId.ToString() == spaceId);

            var qrCodesList = _mapper.Map<List<QrCodeDTO>>(qrCodes);

            return qrCodesList;
        }

        public void DeleteQrCode(int id)
        {
            var spaceId = _utilities.GetUserSpaceId();

            var qrCode = _dbContext
                .QrCodes
                .FirstOrDefault(qc => qc.Id == id && 
                qc.SpaceId.ToString() == spaceId) ?? 
                throw new NotFoundException("Nie znaleziono kodu");

            _dbContext.QrCodes.Remove(qrCode);

            _utilities.SaveChangesToDatabase();
        }

        public void DeleteUserQrCodes()
        {
            var spaceId = _utilities.GetUserSpaceId();

            var qrCodes = _dbContext.QrCodes
                .Where(qc => qc.SpaceId.ToString() == spaceId);

            _dbContext.QrCodes.RemoveRange(qrCodes);

            _utilities.SaveChangesToDatabase();
        }
    }
}
