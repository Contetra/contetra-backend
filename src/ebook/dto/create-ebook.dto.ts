import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateEbookBiiis {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  full_name!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  mobile_number: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(2)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  company: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  form_id: string;
}

export class CreateEbookIpgfcifr {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  full_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  mobile_number: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(2)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  company: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  form_id: string;
}

export class CreateEbookIetfnbs {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  full_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  mobile_number: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(2)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  company: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  form_id: string;
}

export class CreateEbookTtqyfbpa {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  full_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  mobile_number: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(2)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  company: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  form_id: string;
}

export class CreateEbookTyfftoa {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  full_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  mobile_number: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(2)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  company: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  designation: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  city: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  form_id: string;
}

export class CreateEbookDecg {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  full_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  mobile_number: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(2)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  company: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  designation: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  annual_turnover: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  form_id: string;
}

export class CreateEbookSbbg {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  full_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(15)
  mobile_number: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  company: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  designation: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  business_industry: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  annual_turnover: string;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  form_id: string;
}

export class CreateEbookUrgtcss {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  full_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(15)
  mobile_number: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  company: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  designation: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  business_industry: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  annual_turnover: string;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  form_id: string;
}

export class CreateEbookBiiin {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  full_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(15)
  mobile_number: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  company: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  designation: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  business_industry: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  annual_turnover: string;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  form_id: string;
}

export class CreateEbookMcanae {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  full_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(15)
  mobile_number: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  company: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  designation: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  business_industry: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  annual_turnover: string;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  form_id: string;
}

export class CreateEbookYeccfbo {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  full_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(15)
  mobile_number: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  company: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  designation: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  business_industry: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  annual_turnover: string;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  form_id: string;
}

export class CreateEbookBgc {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  full_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(15)
  mobile_number: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  company: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  designation: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  business_industry: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  annual_turnover: string;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  form_id: string;
}

export class CreateEbookEiu {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  full_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(15)
  mobile_number: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  company: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  designation: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  business_industry: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  annual_turnover: string;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  form_id: string;
}

export class CreateEbookRdtwc {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  full_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(15)
  mobile_number: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  company: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  designation: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  business_industry: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  annual_turnover: string;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  form_id: string;
}

export class CreateEbookHtoycacgag {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  full_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(15)
  mobile_number: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  company: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  designation: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  business_industry: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  annual_turnover: string;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  form_id: string;
}

export class CreateEbookEastipate {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  full_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(15)
  mobile_number: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  company: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  designation: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  business_industry: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  annual_turnover: string;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  form_id: string;
}
export class CreateEbookTcgtcecstsobe {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  full_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(15)
  mobile_number: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  company: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  designation: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  business_industry: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  annual_turnover: string;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  form_id: string;
}
export class CreateEbookBiirr {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  full_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(15)
  mobile_number: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  company: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  designation: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  business_industry: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  annual_turnover: string;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  form_id: string;
}
export class CreateEbookPcc {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  full_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(15)
  mobile_number: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  company: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  designation: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  business_industry: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  annual_turnover: string;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  form_id: string;
}
export class CreateEbookRruasioam {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  full_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(15)
  mobile_number: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  company: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  designation: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  business_industry: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  annual_turnover: string;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  form_id: string;
}
export class CreateEbookYfpfe {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  full_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(15)
  mobile_number: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  company: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  designation: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  business_industry: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  annual_turnover: string;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  form_id: string;
}
