import {useSelector} from 'react-redux';

async function GetStateData() {
  console.log('indf hdbfdus');
  let data = '';

  await useSelector(state => (data = state?.auth?.data));
}

export {GetStateData};
