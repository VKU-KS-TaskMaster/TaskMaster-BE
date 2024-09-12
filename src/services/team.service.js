import { db } from "@/core/firebase.config";
import { generateCode } from "@/core/helper";
import ResponseTrait from "@/core/responseTrait";
import {
  TEAM_STATUS_DELETED,
  TEAM_STATUS_PENDING,
} from "@/enums/TeamStatusEnum";
import { teamKey } from "@/models/team.model";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const TeamService = {
  get: async (code) => {
    const teamQuery = query(collection(db, "team"), where("code", "==", code));
    const querySnapshot = await getDocs(teamQuery);
    if (querySnapshot.empty) {
      ResponseTrait.error(`No team found with code: ${code}`);
    }

    const teamDoc = querySnapshot.docs[0];
    return ResponseTrait.success({ id: teamDoc.id, ...teamDoc.data() });
  },
  getList: async (searchParams = {}) => {
    const { name, code, status } = searchParams;
    let q = collection(db, "team");
    const conditions = [];

    if (name) {
      conditions.push(where("name", "==", name));
    }
    if (code) {
      conditions.push(where("code", "==", code));
    }
    if (status) {
      conditions.push(where("status", "in", status));
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

  store: async (teamData) => {
    const { name, description } = teamData;
    const dateNow = new Date();

    const newTeam = {
      name,
      code: generateCode(teamKey, dateNow, name),
      description: description || "",
      status: TEAM_STATUS_PENDING,
      created_at: dateNow,
      updated_at: dateNow,
    };

    const docRef = await addDoc(collection(db, "team"), newTeam);

    return ResponseTrait.success({ id: docRef.id, ...newTeam });
  },
  update: async (code, updateData) => {
    const teamQuery = query(collection(db, "team"), where("code", "==", code));
    const querySnapshot = await getDocs(teamQuery);
    if (querySnapshot.empty) {
      ResponseTrait.error(`No team found with code: ${code}`);
    }

    const teamDoc = querySnapshot.docs[0];
    const dataToUpdate = {
      ...updateData,
      updated_at: new Date(),
    };

    await updateDoc(doc(db, "team", teamDoc.id), dataToUpdate);

    return ResponseTrait.success({ id: teamDoc.id, code, ...dataToUpdate });
  },
  destroy: async (code) => {
    const teamQuery = query(collection(db, "team"), where("code", "==", code));
    const querySnapshot = await getDocs(teamQuery);
    if (querySnapshot.empty) {
      ResponseTrait.error(`No team found with code: ${code}`);
    }

    const teamDoc = querySnapshot.docs[0];
    await updateDoc(doc(db, "team", teamDoc.id), {
      status: TEAM_STATUS_DELETED,
      updated_at: new Date(),
    });
  },
};

export default TeamService;
