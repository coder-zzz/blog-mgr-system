import { message } from "ant-design-vue"

export const result = (response,authShowErrorMsg = true) => {
  const {data} = response;

  if((data.code === 0) && authShowErrorMsg){
    message.error(data.msg)
  }

  return {
    success(cb){
      if(data.code != 0){
        cb(data,response);
      }

      return this
    },
    fail(cb){
      if(data.code != 0){
        cb(data,response);
      }

      return this
    },
    finally(cb){
      cb(data,response);

      return this
    }
  }
}

export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

export const formatTimeStamp = (ts) => {
  const formatNumber =(n) => {
    n = n.toString()
    return n[1] ? n : '0' + n
    }

  const date = new Date(Number(ts));

  const YYYY = date.getFullYear();
  const MM = formatNumber(date.getMonth() + 1);
  const DD = formatNumber(date.getDate());

  const hh = formatNumber(date.getHours());
  const mm = formatNumber(date.getMinutes());
  const ss = formatNumber(date.getSeconds());

  return `${YYYY}/${MM}/${DD}/${hh}:${mm}:${ss}`;
}
