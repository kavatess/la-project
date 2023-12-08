import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Show, ShowProperties, ShowStatuses, ShowTypes } from '@libs/models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateShowService {
  private readonly UPDATE_SHOW_REQUEST_ROUTE = 'show';

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  getShowDetail(showId: string): Observable<Show> {
    return of({
      id: '82346823746',
      [ShowProperties.title]: 'Voice of Nature - 𝐅𝐭. 𝐅𝐀𝐍𝐓𝐀𝐒𝐘 𝐓𝐑𝐈𝐎',
      [ShowProperties.description]: `Âm nhạc vốn là một loại ngôn ngữ, nên nhạc không lời cũng có thể kể nên cả một câu chuyện dù không cần dùng đến bất kỳ câu chữ nào. Tại Voice of Nature, La sẽ kể bạn nghe câu chuyện của Thiên nhiên bằng âm nhạc.
        Nếu bạn đã từng đến với La, hẳn bạn đã quen với đàn dây. Tại Voice of Nature, ngoài nhạc cụ dây, La được vinh dự hợp tác cùng FANTASY TRIO, tam tấu tài năng gồm piano, flute, và clarinet. Các nghệ sĩ tài năng sẽ dùng âm nhạc của mình để đưa đến thính giả những trải  nghiệm nghệ thuật khó quên nhất.`,
      [ShowProperties.logo]: '',
      [ShowProperties.slogan]:
        'If you love music and the nature, this concert is for you <3',
      [ShowProperties.types]: [ShowTypes.Classical] as ShowTypes[],
      // [ShowProperties.artists]: [] as string[],
      [ShowProperties.note]: 'Buổi diễn không bán vé',
      [ShowProperties.startDate]: new Date('12/15/2023'),
      [ShowProperties.endDate]: new Date('12/15/2023'),
      [ShowProperties.startTime]: 60000000,
      [ShowProperties.endTime]: 64800000,
      [ShowProperties.startBookingDate]: new Date('11/15/2023'),
      [ShowProperties.startBookingTime]: 0,
      [ShowProperties.endBookingDate]: new Date('12/5/2023'),
      [ShowProperties.endBookingTime]: 0,
      [ShowProperties.seatNumber]: 800,
      [ShowProperties.remainingSeatNumber]: 800,
      [ShowProperties.isFull]: false,
      [ShowProperties.status]: ShowStatuses.Created,
    } as unknown as Show);
  }

  updateShow(): Show[] {
    return [];
  }
}
