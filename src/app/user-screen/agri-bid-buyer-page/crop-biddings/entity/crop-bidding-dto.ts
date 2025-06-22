import { CropListingsDto } from "../../../agri-bid-farmer-page/crop-listings/entity/crop-listing-dto";

export class CropsBiddingDto {
    farmerId!: string;
    farmerName!: string;
    farmerEmail!: string;
    farmerPhone!: string;
    cropData!: CropListingsDto;
}