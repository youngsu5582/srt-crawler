import { TrainSearchParameters } from "src/types/srt.type";

export function wrapData(trainSearchParameters : TrainSearchParameters){

	const postData = 
    {'dptRsStnCd':trainSearchParameters.departStationCode
	,'arvRsStnCd':trainSearchParameters.arriveStationCode
	,'stlbTrnClsfCd':'05'
	,'trnGpCd':'109'
	,'psgNum':'1'
	,'seatAttCd':'015'
	,'isRequest':'Y'
	,'dptRsStnCdNm':'수서'
	,'arvRsStnCdNm':'동대구'
	,"dlayTnumAplFlg":"Y"
	,'dptDt':trainSearchParameters.departDate
	,'dptTm':trainSearchParameters.departTimeCode
	,'chtnDvCd':'1'
	,'psgInfoPerPrnb1':'1'
	,'psgInfoPerPrnb5':'0'
	,'psgInfoPerPrnb4':'0'
	,'psgInfoPerPrnb2':'0'
	,'psgInfoPerPrnb3':'0'
    }
    return postData;
}