import {
  Component,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButton,
  IonIcon,
  IonBackButton,
  IonButtons,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  callOutline,
  ellipsisVertical,
  addCircleOutline,
  micOutline,
  send,
  chatbubbleOutline,
} from 'ionicons/icons';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { Auth } from '@angular/fire/auth';
import { Message } from 'src/app/models/chat.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonButton,
    IonIcon,
    IonBackButton,
    IonButtons,
    CommonModule,
    FormsModule,
  ],
})
export class ChatPage implements OnInit {
  auth = inject(Auth);
  friendId: string = '';
  chatId: string | null = null;
  messages: Message[] = [];
  isLoading: boolean = false;
  content: string = '';
  friendData: any = null;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private userService: UserService
  ) {
    addIcons({
      callOutline,
      ellipsisVertical,
      chatbubbleOutline,
      addCircleOutline,
      micOutline,
      send,
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      
      if (id === 'new') {
        // Yeni sohbet oluşturma modu - friendId sorgu parametresine bakacağız
        this.chatId = null; // Chat ID'yi null olarak ayarla
      } else {
        // Mevcut sohbet - chat ID'yi kullan
        this.chatId = id;
        this.loadChat();
      }
    });

    this.route.queryParams.subscribe((params) => {
      if (params['friendId']) {
        this.friendId = params['friendId'];
        this.loadChatFromFriendId();
      }
    });
  }

  async loadChat() {
    if (this.chatId && this.auth.currentUser) {
      try {
        // Sohbet ID'sinden kullanıcı bilgilerini al
        const chat = await this.chatService.getChatById(this.chatId);
        if (chat && chat.users) {
          // Diğer kullanıcının ID'sini bul
          const otherUserId = chat.users.find(id => id !== this.auth.currentUser?.uid);
          if (otherUserId) {
            this.friendId = otherUserId;
            this.friendData = await this.userService.getUserById(this.friendId);
          }
        }
        // Mesajları yükle
        this.loadMessages();
      } catch (error) {
        console.error('Error loading chat:', error);
      }
    }
  }

  async loadChatFromFriendId() {
    if (this.friendId && this.auth.currentUser) {
      try {
        // Arkadaş bilgilerini al
        this.friendData = await this.userService.getUserById(this.friendId);
        
        // Lazy chat creation - sadece arkadaş bilgilerini yükle
        // Chat ID'sini kontrol et ama oluşturma
        const existingChatId = await this.chatService.getChat(
          this.auth.currentUser.uid,
          this.friendId
        );

        // Eğer mevcut bir chat varsa, ID'sini ayarla ve mesajları yükle
        if (existingChatId) {
          this.chatId = existingChatId;
          this.loadMessages();
        }
        // Eğer mevcut chat yoksa, chatId null kalır ve mesaj gönderildiğinde oluşturulur
      } catch (error) {
        console.error('Error loading chat from friend ID:', error);
      }
    }
  }

  loadMessages() {
    if (!this.chatId) return;

    this.isLoading = true;
    this.chatService.getMessages(this.chatId).subscribe({
      next: (messages) => {
        this.messages = messages;
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
      },
    });
  }

  async sendMessage(form: NgForm) {
    if (form.valid) {
      if (!this.content.trim() || !this.auth.currentUser) return;
      
      // Eğer friendId yoksa mesaj gönderilemez
      if (!this.friendId) {
        console.error('Friend ID is missing');
        return;
      }

      try {
        this.chatId = await this.chatService.sendMessage(
          this.chatId,
          this.auth.currentUser.uid,
          this.friendId,
          this.content
        );

        // Mesaj gönderildikten sonra form temizle
        this.content = '';
        form.resetForm();

        // Mesajları yeniden yükle
        if (this.chatId) {
          this.loadMessages();
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  }

  getInitials(name: string): string {
    if (!name) return 'U';

    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }

    return name.substring(0, 2).toUpperCase();
  }
}
