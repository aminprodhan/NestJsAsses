import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
    stringToDate(dateString,type=1):Date{
        if(type == 1)
            dateString=dateString+" 00:00:00";
        else
            dateString=dateString+" 23:59:59";
        const date = new Date(Date.parse(dateString));
        return date;
    }
}
