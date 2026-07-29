import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { nombre, correo, codigo } = await request.json();

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: correo,
      subject: "Inscripción confirmada",
      html: `
  <h2>¡Hola ${nombre}!</h2>

  <p>Tu inscripción ha sido registrada correctamente.</p>

  <p><strong>Tu código de inscripción es:</strong></p>

  <h1 style="color:#b91c1c;">${codigo}</h1>

  <p>Guarda este código, ya que será solicitado el día del encuentro.</p>

  <br>

  <b>Iglesia Jesús Abre Caminos</b>
`,
    });

    if (error) {
  console.error("Error de Resend:", error);
  return NextResponse.json(error, { status: 500 });
}

    return NextResponse.json(data);
  } catch (error) {
  console.error("Error en la API:", error);

  return NextResponse.json(
    { error: "Error enviando correo" },
    { status: 500 }
  );
}
}