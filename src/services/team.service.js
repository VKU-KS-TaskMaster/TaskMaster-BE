import { db } from "@/core/firebase.config";
import { generateCode } from "@/core/helper";
import ResponseTrait from "@/core/responseTrait";
import { TEAM_STATUS_PENDING } from "@/enums/TeamStatusEnum";
import { searchParamsSchema, teamKey, teamSchema } from "@/models/team.model";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

const TeamService = {
  get: async (params) => {
    const { error, value } = teamSchema.validate(params);

    if (error) {
      return ResponseTrait.error(error);
    }

    const cacheKey = spaceCacheKey.replace(":code", value.key);
    let resData = await RedisClient.get(cacheKey);
    if (resData) return ResponseTrait.success(resData);

    const docRef = collection(db, "space");
    const docQuery = query(docRef, where("code", "==", value.key));
    const docSnap = await getDocs(docQuery);

    if (docSnap.empty) return ResponseTrait.error("No such Space!");

    resData = docSnap.docs[0].data();
    RedisClient.set(spaceCacheKey.replace(":code", value.key), resData);

    return ResponseTrait.success(resData);
  },
  getList: async (params) => {
    const { error, value } = searchParamsSchema.validate(params);
    if (error) {
      return ResponseTrait.error(error);
    }

    let q = collection(db, "team");
    const conditions = [];

    if (value.name) {
      conditions.push(where("name", "==", value.name));
    }
    if (value.code) {
      conditions.push(where("code", "==", value.code));
    }
    if (value.status) {
      conditions.push(where("status", "in", value.status));
    }

    if (conditions.length > 0) {
      q = query(q, ...conditions);
    }
    const querySnapshot = await getDocs(q);
    const teams = [];
    querySnapshot.forEach((doc) => {
      teams.push({ id: doc.id, ...doc.data() });
    });
    return ResponseTrait.success(teams);
  },

  store: async (params) => {
    const { error, value } = teamSchema.validate(params);
    if (error) {
      return ResponseTrait.error(error);
    }

    const { name, description } = value;
    const dateNow = new Date();

    const newTeam = {
      code: generateCode(teamKey, dateNow, name),
      name,
      status: TEAM_STATUS_PENDING,
      description: description || "",
      created_at: dateNow,
      updated_at: dateNow,
    };

    const docRef = await addDoc(collection(db, "team"), newTeam);

    return ResponseTrait.success({ id: docRef.id, ...newTeam });
  },
  update: async (params, body) => {
    const { error, value } = spaceUpdateSchema.validate({ ...params, ...body });
    if (error) {
      return ResponseTrait.error(error);
    }

    const docRef = collection(db, "space");

    const docQuery = query(docRef, where("code", "==", value.key));

    const docSnap = await getDocs(docQuery);

    if (docSnap.empty) ResponseTrait.error("No such Space!");

    delete value.key;
    await updateDoc(docSnap.docs[0].ref, {
      ...value,
      updated_at: new Date(),
    });

    const resData = (await getDoc(docSnap.docs[0].ref)).data();

    RedisClient.set(spaceCacheKey.replace(":code", value.key), resData);

    return ResponseTrait.success(resData);
  },
  destroy: async (params) => {
    const { error, value } = spaceDestroySchema.validate(params);
    if (error) {
      return ResponseTrait.error(error);
    }

    const docRef = collection(db, "space");

    const docQuery = query(docRef, where("code", "==", value.key));

    const docSnap = await getDocs(docQuery);

    if (docSnap.empty) ResponseTrait.error("No such Space!");

    delete value.key;
    await updateDoc(docSnap.docs[0].ref, {
      status: SPACE_STATUS_DELETED,
      updated_at: new Date(),
      deleted_at: new Date(),
    });
    const resData = (await getDoc(docSnap.docs[0].ref)).data();
    RedisClient.set(spaceCacheKey.replace(":code", value.key), resData);

    return ResponseTrait.success(resData);
  },
};

export default TeamService;
