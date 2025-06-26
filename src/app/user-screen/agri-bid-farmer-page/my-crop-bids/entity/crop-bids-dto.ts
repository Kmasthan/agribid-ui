import { BidDetailsDto } from "../../../agri-bid-buyer-page/crop-biddings/entity/bid-details-dto";
import { CropListingsDto } from "../../crop-listings/entity/crop-listing-dto";

export class CropBidsDto {
    cropDetails!: CropListingsDto;
    bidDetails!: BidDetailsDto
}