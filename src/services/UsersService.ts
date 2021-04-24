import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository"

class UsersService {
  async create(email: string) {
    const usersRepository = getCustomRepository(UsersRepository);

    //Verificar se usuário existe
    const userExist = await usersRepository.findOne({
      email
    });

    //Se existir, retornar user
    if(userExist){
      return userExist;
    }

    const user = usersRepository.create({
      email
    });

    //Se não existir, salvar no DB
    await usersRepository.save(user);

    return user
  }
}

export { UsersService }