import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class GameService {
    constructor(private httpService:HttpService){}

    async getTopGames(){ 
        return await this.httpService.get('https://api.rawg.io/api/games?page_size=100&dates=2019-01-01,2020-01-31.1960-01-01,1969-12-31').toPromise().then((res)=>{
            return res.data.results;
        });      
    }

}
