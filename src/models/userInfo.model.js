import JoiCustom from "@/core/joiCustom.config";

const userInfoKey = "userInfo";
const userInfoCacheKey = "userInfo_:code_";
const userInfoSearchCacheKey = "userInfo.search_:code_";

const userInfoGetSchema = JoiCustom.object({
  key: JoiCustom.string().required(),
});

const userInfoSearchSchema = JoiCustom.object({
  q: JoiCustom.string().optional(),
});

const userInfoStoreSchema = JoiCustom.object({
  user_name: JoiCustom.string().required(),
  first_name: JoiCustom.string().optional(),
  last_name: JoiCustom.string().optional(),
  // email_address: JoiCustom.string().optional(),
  // phone_number: JoiCustom.string().optional(),
}).unknown();

const userInfoUpdateSchema = JoiCustom.object({
  user_name: JoiCustom.string().optional(),
  first_name: JoiCustom.string().optional(),
  last_name: JoiCustom.string().optional(),
  // email_address: JoiCustom.string().optional(),
  // phone_number: JoiCustom.string().optional(),
}).unknown();

const userInfoDestroySchema = JoiCustom.object({
  code: JoiCustom.string().required(),
});

export {
  userInfoKey,
  userInfoCacheKey,
  userInfoSearchCacheKey,
  
  userInfoGetSchema,
  userInfoSearchSchema,
  userInfoStoreSchema,
  userInfoUpdateSchema,
  userInfoDestroySchema,
};
