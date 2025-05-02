export interface Sport {
    name: string;
}

export interface UserProfile {
     first_name :  string;
   last_name :  string;
   age :  number;
   height :  number;
   weight :  number;
   gender :  number;
   sports : Sport[];
   user_id :  string;
   bio :  string;
}