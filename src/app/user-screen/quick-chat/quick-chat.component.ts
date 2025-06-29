import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BidDetailsDto } from '../agri-bid-buyer-page/crop-biddings/entity/bid-details-dto';
@Component({
  selector: 'app-quick-chat',
  standalone: true,
  imports: [MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    CommonModule],
  templateUrl: './quick-chat.component.html',
  styleUrl: './quick-chat.component.css'
})
export class QuickChatComponent {

  bidDetails: BidDetailsDto = new BidDetailsDto();
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.bidDetails = JSON.parse(params['bidDetails']);
    })
  }

  currentUser = 'me';
  selectedUser: any = null;
  newMessage: string = '';
  users = [
    { name: 'Alice' },
    { name: 'Bob' },
    { name: 'Charlie' },
  ];

  messages: { sender: string, text: string }[] = [];

  selectUser(user: any) {
    this.selectedUser = user;
    this.messages = []; // Load chat history in real case
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;
    this.messages.push({ sender: this.currentUser, text: this.newMessage });
    this.newMessage = '';
  }
}
