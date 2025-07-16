import { CropListingsDto } from "../../../agri-bid-farmer-page/crop-listings/entity/crop-listing-dto";

export class BuyerDashboardBidsDto {
    cropDetails!: CropListingsDto;
    position!: number;
    topBidAmount!: number;
    topBidAmountCurrency!: string;
    userBidAmount!: number;
    userBidCurrency!: string;
}