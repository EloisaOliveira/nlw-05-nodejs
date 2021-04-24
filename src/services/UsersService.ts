import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User"
import { UsersRepository } from "../repositories/UsersRepository"

class UsersService {
  private usersRepository: Repository<User>;

  constructor(){
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async create(email: string) {

    //Verificar se usuário existe
    const userExist = await this.usersRepository.findOne({
      email
    });

    //Se existir, retornar user
    if(userExist){
      return userExist;
    }

    const user = this.usersRepository.create({
      email
    });

    //Se não existir, salvar no DB
    await this.usersRepository.save(user);

    return user
  }
}

export { UsersService }