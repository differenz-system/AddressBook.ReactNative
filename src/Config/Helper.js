import {font} from '../Constant';

export const CommonFunction={
    Measurement:(CondiosDevice,IosDevice,ADevice)=>{
      let value= font.ISIOS ? font.CONDITION ? CondiosDevice : IosDevice : ADevice
      return value
    },
}