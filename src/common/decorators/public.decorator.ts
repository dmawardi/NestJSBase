import { SetMetadata } from '@nestjs/common';

// Creates a key string value of isPublic
export const IS_PUBLIC_KEY = 'isPublic';

// export Public as a function that sets meta data with key of above and value true
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
