export interface StudentLoginProps {
    email: string;
    password: string;
}

export interface StudentLoginResult {
    access_token: string;
}

export interface MyInfo {
  data: {
    my: MyData
  }
}

export interface MyData {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  subNumber?: string;
  address: string;
  addressDetail: string;
  zoneCode: string;
}


