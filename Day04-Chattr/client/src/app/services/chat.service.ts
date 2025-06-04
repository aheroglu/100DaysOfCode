import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  Firestore,
  getDoc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Chat, Message } from '../models/chat.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private firestore = inject(Firestore);

  // Sadece mevcut chat'i kontrol eder, yoksa null döner (lazy chat creation için)
  async getChat(
    user1Id: string,
    user2Id: string
  ): Promise<string | null> {
    const chatsRef = collection(this.firestore, 'chats');
    const chatQuery = query(
      chatsRef,
      where('users', 'in', [
        [user1Id, user2Id],
        [user2Id, user1Id],
      ])
    );

    const existing = await getDocs(chatQuery);

    if (!existing.empty) {
      console.log('Mevcut chat bulundu:', existing.docs[0].id);
      return existing.docs[0].id;
    }

    return null;
  }
  
  // Geriye uyumluluk için getOrCreateChat metodu
  async getOrCreateChat(
    user1Id: string,
    user2Id: string
  ): Promise<string | null> {
    return this.getChat(user1Id, user2Id);
  }

  async createChat(user1Id: string, user2Id: string): Promise<string> {
    const chatsRef = collection(this.firestore, 'chats');
    const chatQuery = query(
      chatsRef,
      where('users', 'in', [
        [user1Id, user2Id],
        [user2Id, user1Id],
      ])
    );

    const existing = await getDocs(chatQuery);
    if (!existing.empty) {
      return existing.docs[0].id;
    }

    const newChat: Chat = {
      users: [user1Id, user2Id],
      createdAt: Timestamp.now(),
      lastMessage: '',
      lastMessageAt: Timestamp.now(),
    };

    const newChatRef = await addDoc(chatsRef, newChat);
    return newChatRef.id;
  }

  async sendMessage(
    chatId: string | null,
    user1Id: string,
    user2Id: string,
    content: string
  ): Promise<string> {
    if (!chatId) {
      const newChat: Chat = {
        users: [user1Id, user2Id],
        createdAt: Timestamp.now(),
        lastMessage: content,
        lastMessageAt: Timestamp.now(),
      };

      const chatsRef = collection(this.firestore, 'chats');
      const newChatRef = await addDoc(chatsRef, newChat);
      chatId = newChatRef.id;
    }

    const message: Message = {
      senderId: user1Id,
      content,
      sentAt: Timestamp.now(),
      seen: false,
    };

    const messagesRef = collection(this.firestore, `chats/${chatId}/messages`);
    await addDoc(messagesRef, message);

    const chatDocRef = doc(this.firestore, `chats/${chatId}`);
    await updateDoc(chatDocRef, {
      lastMessage: content,
      lastMessageAt: Timestamp.now(),
    });

    return chatId;
  }

  getMessages(chatId: string): Observable<Message[]> {
    const messagesRef = collection(this.firestore, `chats/${chatId}/messages`);
    const messagesQuery = query(messagesRef, orderBy('sentAt', 'asc'));
    return collectionData(messagesQuery, { idField: 'id' }) as Observable<
      Message[]
    >;
  }

  getUserChats(userId: string): Observable<Chat[]> {
    const chatsRef = collection(this.firestore, 'chats');
    const q = query(chatsRef, where('users', 'array-contains', userId));
    
    // Önce normal chat verilerini al
    return new Observable<Chat[]>(observer => {
      const subscription = (collectionData(q, { idField: 'id' }) as Observable<Chat[]>).subscribe({
        next: async (chats) => {
          try {
            // Her chat için diğer kullanıcının bilgilerini getir
            const chatsWithUserDetails = await Promise.all(
              chats.map(async (chat) => {
                // Diğer kullanıcının ID'sini bul
                const otherUserId = chat.users.find(id => id !== userId);
                
                if (otherUserId) {
                  // Diğer kullanıcının bilgilerini getir
                  const userDocRef = doc(this.firestore, `users/${otherUserId}`);
                  const userDoc = await getDoc(userDocRef);
                  
                  if (userDoc.exists()) {
                    // Chat nesnesine diğer kullanıcı bilgilerini ekle
                    return {
                      ...chat,
                      otherUser: userDoc.data() as any
                    };
                  }
                }
                
                // Eğer diğer kullanıcı bulunamazsa, orijinal chat nesnesini döndür
                return chat;
              })
            );
            
            // Zenginleştirilmiş chat verilerini gönder
            observer.next(chatsWithUserDetails);
          } catch (error) {
            console.error('Chat kullanıcı detaylarını getirme hatası:', error);
            observer.error(error);
          }
        },
        error: (err) => observer.error(err),
        complete: () => observer.complete()
      });
      
      // Aboneliği temizle
      return () => subscription.unsubscribe();
    });
  }

  async getChatById(chatId: string): Promise<Chat | null> {
    try {
      const chatDocRef = doc(this.firestore, `chats/${chatId}`);
      const chatDoc = await getDoc(chatDocRef);
      
      if (chatDoc.exists()) {
        return { id: chatDoc.id, ...chatDoc.data() } as Chat;
      } else {
        console.log('Chat bulunamadı');
        return null;
      }
    } catch (error) {
      console.error('Chat getirme hatası:', error);
      return null;
    }
  }
}
