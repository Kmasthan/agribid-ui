export class QuickChatDto {
    id!: string;
    senderId!: string;
    senderName!: string;
    senderMobile!: string;
    receverId!: string;
    receverName!: string;
    receverMobile!: string;
    message!: string;
    edited!: boolean;
    createdAt = new Date();
    modifiedAt = new Date();

    conversations: QuickChatDto[] = [];
}