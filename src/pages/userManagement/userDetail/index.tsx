import { useLocation, useNavigate } from "react-router-dom";
import { Button, Label, LoadingOverlay } from "../../../components";
import { useEffect, useState } from "react";
import styles from "./UserDetail.module.css";
import { getUserById } from "../../../services/UserService";
import { notify } from "../../../services/notification";
import type { User } from "../../../types/User";
import { formatDate } from "../../../utils/formatDate";

export default function UserDatail() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User[]>([]);

  const navigate = useNavigate();
  const { state } = useLocation();
  const id = state?.id;

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const response = await getUserById(id);
        console.log(response);
        setUser([response]);
        setLoading(false);
        notify("success", "Sucesso.");
      } catch (error) {
        if (typeof error === "string") {
          notify("warning", error);
          setLoading(false);
          console.log(error);
        } else if (error instanceof Error) {
          notify("warning", error.message);
          setLoading(false);
          console.log(error.message);
        }
      }
    }
    load();
  }, [id]);

  function handleUserUpdate(id: number) {
    navigate("/user/userupdate", {
      state: { id },
    });
  }

  function handleUserUpdatePassword(id: number) {
    navigate("/user/userupdatepass", {
      state: { id },
    });
  }

  function goBack() {
    navigate("/user/listusers");
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Detalhes usuário</h2>
      <LoadingOverlay isLoading={loading} />
      <nav className={styles.nav}>
        {(user ?? []).map((item) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.buttons}>
              <Button
                title="Atualizar"
                isLoading={false}
                backgroundColor="var(--neutral-600)"
                onClick={() => handleUserUpdate(item.id)}
              />
              <Button
                title="Alterar senha"
                isLoading={false}
                backgroundColor="var(--neutral-600)"
                onClick={() => handleUserUpdatePassword(item.id)}
              />
              <Button
                title="Voltar"
                isLoading={false}
                backgroundColor="var(--neutral-400)"
                onClick={goBack}
              />
            </div>
            <Label iconName="id" title="ID" value={item.id} />
            <Label iconName="info" title="Nome" value={item.full_name} />
            <Label iconName="number" title="CPF" value={item.cpf} />
            <Label iconName="phoneCall" title="Telefone" value={item.phone} />
            <Label iconName="mail" title="Email" value={item.email} />
            <Label
              iconName="userStar"
              title="Nome de usuário"
              value={item.username}
            />
            <Label iconName="badgeCheck" title="Tipo" value={item.role} />
            <Label iconName="question" title="Status" value={item.status} />
            <Label iconName="lock" title="Função" value={item.position?.name} />
            <Label
              iconName="department1"
              title="Setor"
              value={item.department?.name}
            />
            <Label
              iconName="time1"
              title="Criado em"
              value={formatDate(item.createdAt)}
            />
            <Label
              iconName="time2"
              title="Atualizado em"
              value={formatDate(item.updatedAt)}
            />
          </div>
        ))}
      </nav>
    </div>
  );
}
