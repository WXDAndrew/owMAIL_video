import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Img,
  staticFile,
  Sequence,
} from "remotion";

const C = {
  bg: "#0D1117",
  bgCard: "#161B22",
  bgCard2: "#1C2333",
  primary: "#1A8F87",
  primaryDark: "#0a5c57",
  primaryLight: "#e6f7f6",
  white: "#FFFFFF",
  gray: "#8B949E",
  grayDark: "#30363D",
  green: "#3FB950",
  orange: "#F0883E",
  purple: "#8957E5",
  blue: "#58A6FF",
};

const T = {
  logoIntro: { from: 0, dur: 90 },
  emailConn: { from: 90, dur: 210 },
  dashboard: { from: 300, dur: 180 },
  facturas: { from: 480, dur: 180 },
  citas: { from: 660, dur: 180 },
  owiChat: { from: 840, dur: 180 },
  summaries: { from: 1020, dur: 180 },
  categorizacion: { from: 1200, dur: 180 },
  alertas: { from: 1380, dur: 180 },
  reportes: { from: 1560, dur: 180 },
  sendEmail: { from: 1740, dur: 180 },
  comisiones: { from: 1920, dur: 180 },
  outro: { from: 2100, dur: 120 },
};

const CLAMP = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};
const fadeIn = (frame: number, start = 0, end = 30) =>
  interpolate(frame, [start, end], [0, 1], CLAMP);
const slideUp = (frame: number, start = 0, end = 40, dist = 80) =>
  interpolate(frame, [start, end], [dist, 0], CLAMP);

// Scene 1: Logo Intro
const SceneLogoIntro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sp = spring({ frame, fps, config: { damping: 30, stiffness: 100 } });
  const opacity = fadeIn(frame, 0, 30);
  const logoScale = 0.4 + sp * 0.6;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ transform: `scale(${logoScale})`, opacity }}>
        <Img
          src={staticFile("logo.png")}
          style={{ width: 500, height: "auto" }}
        />
      </div>
      <div
        style={{
          marginTop: 30,
          opacity: fadeIn(frame, 40, 80),
          fontSize: 36,
          color: C.primary,
          fontWeight: 400,
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        AI-powered email management
      </div>
    </div>
  );
};

// SVG Icons
const GmailIcon = () => (
  <svg width="80" height="80" viewBox="0 0 48 48">
    <rect width="48" height="48" rx="8" fill="#f1f1f1" />
    <path d="M0 12l20 14 4-2.8 4 2.8L48 12v28H0V12z" fill="#fff" />
    <path d="M0 12v28l14-14z" fill="#4285F4" />
    <path d="M48 12v28L34 26z" fill="#34A853" />
    <path d="M0 40l14-14 10 7 10-7 14 14H0z" fill="#FBBC05" />
    <path d="M0 12l24 16.8L48 12" fill="#EA4335" />
  </svg>
);

const OutlookIcon = () => (
  <svg width="80" height="80" viewBox="0 0 48 48">
    <rect width="48" height="48" rx="8" fill="#0078D4" />
    <rect
      x="8"
      y="20"
      height="28"
      rx="10"
      width="2"
      fill="#50D1FE"
      opacity="0.6"
    />
    <rect
      x="12"
      y="6"
      width="20"
      height="28"
      rx="2"
      fill="#50D1FE"
      opacity="0.8"
    />
    <rect x="16" y="4" width="20" height="28" rx="2" fill="#28A8E8" />
    <circle cx="20" cy="28" r="8" fill="white" />
    <text x="15.5" y="32" fontSize="10" fontWeight="bold" fill="#0078D4">
      O
    </text>
  </svg>
);

const YahooIcon = () => (
  <svg width="80" height="80" viewBox="0 0 48 48">
    <rect width="48" height="48" rx="8" fill="#6001D2" />
    <text x="6" y="34" fontSize="22" fontWeight="900" fill="white">
      Y!
    </text>
  </svg>
);

// Scene 2: Email Connections
const SceneEmailConnections = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleOp = fadeIn(frame, 0, 30);
  const titleTy = slideUp(frame, 0, 30);
  const centerSp = spring({
    frame,
    fps,
    config: { damping: 30, stiffness: 100 },
  });

  const logoDelays = [40, 60, 80];
  const centerX = 540;
  const centerY = 900;

  const logos = [
    {
      label: "Gmail",
      icon: <GmailIcon />,
      color: "#EA4335",
      offsetX: -320,
      offsetY: -220,
    },
    {
      label: "Outlook",
      icon: <OutlookIcon />,
      color: "#0078D4",
      offsetX: -320,
      offsetY: -40,
    },
    {
      label: "Yahoo",
      icon: <YahooIcon />,
      color: "#6001D2",
      offsetX: -320,
      offsetY: 140,
    },
  ];

  const lineProgresses = logoDelays.map((d) =>
    interpolate(frame, [d + 20, d + 60], [0, 1], CLAMP),
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 40px",
      }}
    >
      <div
        style={{
          opacity: titleOp,
          transform: `translateY(${titleTy}px)`,
          textAlign: "center",
          marginBottom: 60,
        }}
      >
        <h2
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: "#1a1a1a",
            margin: 0,
            letterSpacing: -2,
          }}
        >
          Conecta tu correo
        </h2>
        <p
          style={{
            fontSize: 36,
            color: C.gray,
            marginTop: 16,
            fontWeight: 500,
          }}
        >
          Compatible con cualquier proveedor
        </p>
      </div>
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1000,
          height: 550,
        }}
      >
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            overflow: "visible",
          }}
        >
          {logos.map((logo, i) => {
            const len = Math.sqrt(
              320 ** 2 + (logo.offsetY - centerY + 220) ** 2,
            );
            const dashOffset = interpolate(lineProgresses[i], [0, 1], [len, 0]);
            return (
              <line
                key={i}
                x1={centerX + logo.offsetX + 80}
                y1={centerY + logo.offsetY}
                x2={centerX}
                y2={centerY}
                stroke={C.primary}
                strokeWidth="4"
                strokeDasharray={len}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
              />
            );
          })}
        </svg>
        {logos.map((logo, i) => {
          const sp = spring({
            frame: Math.max(0, frame - logoDelays[i]),
            fps,
            config: { damping: 30, stiffness: 100 },
          });
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: centerX + logo.offsetX,
                top: centerY + logo.offsetY,
                transform: "translate(-50%, -50%)",
                opacity: sp,
                display: "flex",
                alignItems: "center",
                gap: 28,
              }}
            >
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 24,
                  backgroundColor: "#f8f9fa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 8px 30px ${logo.color}33`,
                  border: `3px solid ${logo.color}55`,
                }}
              >
                {logo.icon}
              </div>
              <span style={{ color: "#1a1a1a", fontSize: 36, fontWeight: 700 }}>
                {logo.label}
              </span>
            </div>
          );
        })}
        <div
          style={{
            position: "absolute",
            left: centerX,
            top: centerY,
            transform: "translate(-50%, -50%)",
            opacity: centerSp,
          }}
        >
          <Img
            src={staticFile("logo.png")}
            style={{
              width: 220,
              height: "auto",
              filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.2))",
            }}
          />
        </div>
      </div>
      <div
        style={{
          opacity: fadeIn(frame, 120, 160),
          transform: `translateY(${slideUp(frame, 120, 160)})`,
          textAlign: "center",
          backgroundColor: `${C.primary}15`,
          border: `2px solid ${C.primary}33`,
          borderRadius: 24,
          padding: "24px 48px",
          marginTop: 60,
        }}
      >
        <span style={{ color: C.primary, fontSize: 32, fontWeight: 700 }}>
          Gmail | Outlook | Yahoo | IMAP/SMTP
        </span>
      </div>
    </div>
  );
};

// StatCard
const StatCard = ({
  label,
  toValue = 0,
  delay = 0,
  accent = C.primary,
  prefix = "",
}: {
  label: string;
  toValue?: number;
  delay?: number;
  accent?: string;
  prefix?: string;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = Math.max(0, frame - delay);
  const sp = spring({ frame: f, fps, config: { damping: 30, stiffness: 120 } });
  const ty = interpolate(sp, [0, 1], [40, 0]);
  const currentValue = interpolate(sp, [0, 1], [0, toValue]);
  const displayValue =
    toValue >= 10
      ? Math.floor(currentValue).toLocaleString()
      : currentValue.toFixed(2);
  return (
    <div
      style={{
        backgroundColor: C.white,
        borderRadius: 16,
        padding: "20px 24px",
        marginBottom: 16,
        opacity: sp,
        transform: `translateY(${ty}px)`,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        borderLeft: `5px solid ${accent}`,
      }}
    >
      <div
        style={{
          fontSize: 16,
          color: C.gray,
          fontWeight: 600,
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 36, fontWeight: 900, color: C.bg }}>
        {prefix}
        {displayValue}
      </div>
    </div>
  );
};

// Phone Mockup
const PhoneMockup = ({
  opacity = 1,
  scale = 1,
}: {
  opacity?: number;
  scale?: number;
}) => (
  <div
    style={{
      transform: `scale(${scale})`,
      opacity,
      width: 440,
      minHeight: 800,
      backgroundColor: C.white,
      borderRadius: 32,
      overflow: "hidden",
      boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
      border: `2px solid ${C.grayDark}`,
    }}
  >
    <div
      style={{
        backgroundColor: C.primaryLight,
        padding: "14px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{ width: 22, height: 3, backgroundColor: C.primary }}
            />
          ))}
        </div>
        <Img
          src={staticFile("logo.png")}
          style={{ height: 32, width: "auto", marginLeft: 8 }}
        />
      </div>
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          backgroundColor: C.primary,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: 800,
          fontSize: 16,
        }}
      >
        A
      </div>
    </div>
    <div style={{ backgroundColor: "#F5F7FA", padding: 28 }}>
      <h3
        style={{ fontSize: 32, fontWeight: 900, color: C.bg, marginBottom: 24 }}
      >
        Dashboard
      </h3>
      <StatCard label="Total Ventas" toValue={937.25} delay={10} prefix="$" />
      <StatCard
        label="Total Comisiones"
        toValue={56.24}
        delay={25}
        prefix="$"
        accent={C.green}
      />
      <StatCard
        label="Facturas procesadas"
        toValue={4}
        delay={40}
        accent={C.blue}
      />
      <StatCard
        label="Comisiones pendientes"
        toValue={48.3}
        delay={55}
        prefix="$"
        accent={C.orange}
      />
    </div>
  </div>
);

// Scene 3: Dashboard
const SceneDashboard = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sp = spring({ frame, fps, config: { damping: 30, stiffness: 100 } });
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(180deg, ${C.bg} 0%, #0f1923 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 30px",
      }}
    >
      <div
        style={{
          opacity: fadeIn(frame),
          transform: `translateY(${slideUp(frame)})`,
          marginBottom: 40,
          textAlign: "center",
        }}
      >
        <h2
          style={{ fontSize: 72, fontWeight: 900, color: C.white, margin: 0 }}
        >
          Dashboard inteligente
        </h2>
        <p style={{ color: C.gray, fontSize: 30, margin: "12px 0 0" }}>
          Tu negocio, en tiempo real
        </p>
      </div>
      <div style={{ marginTop: 50 }}>
        <PhoneMockup opacity={fadeIn(frame, 15, 45)} scale={1.1 + sp * 0.1} />
      </div>
    </div>
  );
};

// Scene 4: Facturas
const FacturaRow = ({
  inv,
  index,
}: {
  inv: {
    id: string;
    empresa: string;
    monto: string;
    estado: string;
    color: string;
  };
  index: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sp = spring({
    frame: Math.max(0, frame - index * 22 - 20),
    fps,
    config: { damping: 30 },
  });
  return (
    <div
      key={index}
      style={{
        backgroundColor: C.bgCard,
        borderRadius: 20,
        padding: "24px 28px",
        marginBottom: 18,
        opacity: sp,
        transform: `translateX(${interpolate(sp, [0, 1], [-80, 0])}px)`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderLeft: `5px solid ${inv.color}`,
      }}
    >
      <div>
        <div style={{ color: C.gray, fontSize: 16, marginBottom: 6 }}>
          #{inv.id}
        </div>
        <div style={{ color: C.white, fontSize: 26, fontWeight: 800 }}>
          {inv.empresa}
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ color: C.white, fontSize: 28, fontWeight: 900 }}>
          {inv.monto}
        </div>
        <div style={{ color: inv.color, fontSize: 16, marginTop: 6 }}>
          {inv.estado}
        </div>
      </div>
    </div>
  );
};

const SceneFacturas = () => {
  const frame = useCurrentFrame();
  const invoices = [
    {
      id: "001",
      empresa: "TechCorp S.A.",
      monto: "$1,250.00",
      estado: "Procesada",
      color: C.green,
    },
    {
      id: "002",
      empresa: "Servicios XYZ",
      monto: "$380.50",
      estado: "Procesada",
      color: C.green,
    },
    {
      id: "003",
      empresa: "Global Trade",
      monto: "$2,100.00",
      estado: "Procesada",
      color: C.green,
    },
    {
      id: "004",
      empresa: "Empresa ABC",
      monto: "$560.75",
      estado: "Pendiente",
      color: C.orange,
    },
  ];
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: C.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 40px",
      }}
    >
      <div
        style={{
          opacity: fadeIn(frame),
          transform: `translateY(${slideUp(frame)})`,
          marginBottom: 40,
          textAlign: "center",
        }}
      >
        <h2
          style={{ fontSize: 72, fontWeight: 900, color: C.white, margin: 0 }}
        >
          Facturas
        </h2>
        <p style={{ color: C.gray, fontSize: 28, margin: "12px 0 0" }}>
          Detectadas y procesadas automáticamente
        </p>
      </div>
      <div style={{ width: "100%", maxWidth: 700 }}>
        {invoices.map((inv, i) => (
          <FacturaRow key={i} inv={inv} index={i} />
        ))}
      </div>
      <div
        style={{
          opacity: fadeIn(frame, 140, 180),
          transform: `translateY(${slideUp(frame, 140, 180)})`,
          backgroundColor: `${C.green}22`,
          borderRadius: 20,
          padding: "18px 36px",
          border: `2px solid ${C.green}44`,
          marginTop: 20,
        }}
      >
        <span style={{ color: C.green, fontSize: 28, fontWeight: 800 }}>
          Detección de duplicados automática
        </span>
      </div>
    </div>
  );
};

// Scene 5: Citas
const SceneCitas = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const citas = [
    {
      tipo: "Odontología",
      medico: "Dr. Garcia",
      fecha: "Mañana 10:00 AM",
      urgente: true,
    },
    {
      tipo: "Oftalmologia",
      medico: "Dra. Martinez",
      fecha: "Vie 15 Mar, 3:30 PM",
      urgente: false,
    },
    {
      tipo: "Medicina General",
      medico: "Dr. Lopez",
      fecha: "Lun 18 Mar, 9:00 AM",
      urgente: false,
    },
  ];
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: C.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 40px",
      }}
    >
      <div
        style={{
          opacity: fadeIn(frame),
          transform: `translateY(${slideUp(frame)})`,
          marginBottom: 40,
          textAlign: "center",
        }}
      >
        <h2
          style={{ fontSize: 72, fontWeight: 900, color: C.white, margin: 0 }}
        >
          Citas médicas
        </h2>
        <p style={{ color: C.gray, fontSize: 28, margin: "12px 0 0" }}>
          Detectadas desde tu correo, automáticamente
        </p>
      </div>
      <div style={{ width: "100%", maxWidth: 700 }}>
        {citas.map((c, i) => {
          const sp = spring({
            frame: Math.max(0, frame - i * 25 - 20),
            fps,
            config: { damping: 30 },
          });
          return (
            <div
              key={i}
              style={{
                backgroundColor: c.urgente ? `${C.orange}22` : C.bgCard,
                borderRadius: 24,
                padding: "28px 32px",
                marginBottom: 20,
                opacity: sp,
                transform: `scale(${0.9 + sp * 0.1})`,
                border: c.urgente
                  ? `3px solid ${C.orange}`
                  : `2px solid ${C.grayDark}`,
              }}
            >
              {c.urgente && (
                <div
                  style={{
                    backgroundColor: C.orange,
                    color: "white",
                    fontSize: 15,
                    fontWeight: 800,
                    padding: "6px 14px",
                    borderRadius: 50,
                    display: "inline-block",
                    marginBottom: 12,
                  }}
                >
                  PROXIMA
                </div>
              )}
              <div>
                <div style={{ color: C.white, fontSize: 28, fontWeight: 800 }}>
                  {c.tipo}
                </div>
                <div style={{ color: C.gray, fontSize: 22, marginTop: 6 }}>
                  {c.medico}
                </div>
                <div
                  style={{
                    color: C.primary,
                    fontSize: 22,
                    fontWeight: 700,
                    marginTop: 6,
                  }}
                >
                  {c.fecha}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          opacity: fadeIn(frame, 130, 170),
          textAlign: "center",
          color: C.primaryLight,
          fontSize: 28,
          fontWeight: 700,
          padding: "0 40px",
          marginTop: 20,
        }}
      >
        owMAIL tambien detecta reuniones, citas y recordatorios
      </div>
    </div>
  );
};

// ChatBubble
const ChatBubble = ({
  text,
  isUser,
  delay,
}: {
  text: string;
  isUser: boolean;
  delay: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sp = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 30 },
  });
  const tx = interpolate(sp, [0, 1], [isUser ? 60 : -60, 0]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: 20,
        opacity: sp,
        transform: `translateX(${tx}px)`,
      }}
    >
      {!isUser && (
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            backgroundColor: C.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 12,
            flexShrink: 0,
            fontSize: 24,
            fontWeight: 700,
            color: "white",
          }}
        >
          owi
        </div>
      )}
      <div
        style={{
          backgroundColor: isUser ? C.grayDark : C.primary,
          color: C.white,
          padding: "18px 24px",
          borderRadius: isUser ? "24px 8px 24px 24px" : "8px 24px 24px 24px",
          fontSize: 24,
          maxWidth: "85%",
          lineHeight: 1.5,
        }}
      >
        {text}
      </div>
    </div>
  );
};

// Scene 6: owi Chat
const SceneOwiChat = () => {
  const frame = useCurrentFrame();
  const messages = [
    { text: "Cuantos correos sin leer tengo?", isUser: true, delay: 15 },
    {
      text: "Tienes 12 correos sin leer. 3 son facturas, 2 son citas medicas y 1 es urgente.",
      isUser: false,
      delay: 50,
    },
    { text: "Resume el correo urgente", isUser: true, delay: 100 },
    {
      text: "Es de tu proveedor TechCorp: factura #004 por $560.75 vence en 2 dias. Queires que la procese?",
      isUser: false,
      delay: 140,
    },
  ];
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: C.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 40px",
      }}
    >
      <div
        style={{
          opacity: fadeIn(frame),
          transform: `translateY(${slideUp(frame)})`,
          marginBottom: 40,
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            marginBottom: 12,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              backgroundColor: C.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 700,
              color: "white",
              boxShadow: `0 0 30px ${C.primary}`,
            }}
          >
            owi
          </div>
          <h2
            style={{ fontSize: 72, fontWeight: 900, color: C.white, margin: 0 }}
          >
            owi
          </h2>
        </div>
        <p style={{ color: C.gray, fontSize: 28, margin: 0 }}>
          Tu asistente de correo con IA
        </p>
      </div>
      <div
        style={{
          width: "100%",
          maxWidth: 720,
          backgroundColor: C.bgCard,
          borderRadius: 28,
          padding: "32px 28px",
          boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
          border: `2px solid ${C.grayDark}`,
        }}
      >
        {messages.map((m, i) => (
          <ChatBubble key={i} text={m.text} isUser={m.isUser} delay={m.delay} />
        ))}
      </div>
      <div
        style={{
          opacity: fadeIn(frame, 180, 220),
          transform: `translateY(${slideUp(frame, 180, 220)})`,
          marginTop: 32,
          textAlign: "center",
          color: C.primaryLight,
          fontSize: 30,
          fontWeight: 800,
        }}
      >
        Pregunta cualquier cosa. owi conoce tu inbox.
      </div>
    </div>
  );
};

// ReporteField
const ReporteField = ({
  label,
  value,
  delay,
}: {
  label: string;
  value: string;
  delay: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sp = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 30 },
  });
  return (
    <div style={{ marginBottom: 20, opacity: sp }}>
      <div
        style={{
          fontSize: 14,
          color: C.primary,
          marginBottom: 6,
          fontWeight: 700,
        }}
      >
        {label}
      </div>
      <div
        style={{
          border: `2px solid #ddd`,
          borderRadius: 12,
          padding: "16px 18px",
          fontSize: 20,
          color: C.bg,
          backgroundColor: C.white,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {value}
      </div>
    </div>
  );
};

// ReportesPhone
const ReportesPhone = ({
  opacity = 1,
  scale = 1,
  pdfProgress = 0,
  pdfScale = 1,
}: {
  opacity?: number;
  scale?: number;
  pdfProgress?: number;
  pdfScale?: number;
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        transform: `scale(${scale})`,
        opacity,
        width: 440,
        minHeight: 800,
        backgroundColor: C.white,
        borderRadius: 32,
        overflow: "hidden",
        boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
        border: `2px solid ${C.grayDark}`,
      }}
    >
      <div
        style={{
          backgroundColor: C.primaryLight,
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{ width: 22, height: 3, backgroundColor: C.primary }}
              />
            ))}
          </div>
          <Img
            src={staticFile("logo.png")}
            style={{ height: 32, width: "auto", marginLeft: 8 }}
          />
        </div>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            backgroundColor: C.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: 800,
            fontSize: 16,
          }}
        >
          A
        </div>
      </div>
      <div style={{ backgroundColor: "#F5F7FA", padding: 28, minHeight: 700 }}>
        <h3
          style={{
            fontSize: 32,
            fontWeight: 900,
            color: C.bg,
            marginBottom: 28,
          }}
        >
          Reportes
        </h3>
        <ReporteField label="Fecha Inicio" value="01/03/2026" delay={0} />
        <ReporteField label="Fecha Fin" value="09/03/2026" delay={20} />
        <div
          style={{
            backgroundColor: C.purple,
            borderRadius: 16,
            padding: "20px",
            textAlign: "center",
            color: C.white,
            fontSize: 22,
            fontWeight: 800,
            marginTop: 12,
          }}
        >
          Generar Reporte
        </div>
        <div
          style={{
            marginTop: 28,
            opacity: fadeIn(frame, 80, 110),
            transform: `scale(${pdfScale})`,
          }}
        >
          <div style={{ fontSize: 16, color: C.gray, marginBottom: 10 }}>
            Generando PDF...
          </div>
          <div
            style={{
              backgroundColor: "#e0e0e0",
              borderRadius: 99,
              overflow: "hidden",
              height: 10,
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${pdfProgress * 100}%`,
                backgroundColor: C.purple,
                borderRadius: 99,
              }}
            />
          </div>
          <div
            style={{
              marginTop: 14,
              backgroundColor: "#e8f5e9",
              borderRadius: 10,
              padding: "14px 18px",
              color: C.green,
              fontSize: 18,
              fontWeight: 800,
              opacity: interpolate(pdfProgress, [0.95, 1], [0, 1], CLAMP),
            }}
          >
            reporte_mar2026.pdf generado
          </div>
        </div>
      </div>
    </div>
  );
};

// Scene: AI Email Summaries
const SceneSummaries = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const emails = [
    {
      from: "Cliente ABC",
      subject: "Confirmacion de pedido #1234",
      preview: "Gracias por su compra...",
      time: "2 min",
    },
    {
      from: "Proveedor XYZ",
      subject: "Factura pendiente de pago",
      preview: "Le recordamos que tiene...",
      time: "15 min",
    },
    {
      from: "Equipo Marketing",
      subject: "Reunion programada",
      preview: "Tenemos una reunion mañana...",
      time: "1 hora",
    },
  ];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(135deg, #1a1a2e 0%, ${C.bg} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "50px 30px",
      }}
    >
      <div
        style={{
          opacity: fadeIn(frame),
          transform: `translateY(${slideUp(frame)})`,
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        <h2
          style={{ fontSize: 64, fontWeight: 900, color: C.white, margin: 0 }}
        >
          Resumenes con IA
        </h2>
        <p style={{ color: C.gray, fontSize: 28, margin: "12px 0 0" }}>
          owi lee tus correos y te da el resumen
        </p>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: 700,
          backgroundColor: "#0d1117",
          borderRadius: 24,
          padding: 8,
          opacity: fadeIn(frame, 20, 50),
        }}
      >
        {emails.map((email, i) => {
          const emailSp = spring({
            frame: Math.max(0, frame - i * 20 - 30),
            fps,
            config: { damping: 30 },
          });
          return (
            <div
              key={i}
              style={{
                backgroundColor: "#161b22",
                borderRadius: 16,
                padding: "20px 24px",
                marginBottom: 8,
                opacity: emailSp,
                transform: `translateX(${interpolate(emailSp, [0, 1], [-60, 0])}px)`,
                borderLeft: `4px solid ${i === 0 ? "#4ade80" : i === 1 ? "#fbbf24" : "#60a5fa"}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <span style={{ color: C.white, fontWeight: 700, fontSize: 22 }}>
                  {email.from}
                </span>
                <span style={{ color: C.gray, fontSize: 16 }}>
                  {email.time}
                </span>
              </div>
              <div style={{ color: C.white, fontSize: 20, marginBottom: 6 }}>
                {email.subject}
              </div>
              <div style={{ color: C.gray, fontSize: 18 }}>{email.preview}</div>
              {i === 0 && (
                <div
                  style={{
                    marginTop: 12,
                    padding: "10px 16px",
                    backgroundColor: "#22c55e20",
                    borderRadius: 10,
                    display: "inline-block",
                  }}
                >
                  <span
                    style={{ color: "#4ade80", fontSize: 16, fontWeight: 600 }}
                  >
                    Resumen: Pedido confirmado, enviando en 24h
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Scene: Email Categorization
const SceneCategorizacion = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const categories = [
    { name: "Facturas", icon: "📄", count: 12, color: "#4ade80" },
    { name: "Clientes", icon: "👥", count: 8, color: "#60a5fa" },
    { name: "Promociones", icon: "🔥", count: 24, color: "#f472b6" },
    { name: "Importantes", icon: "⭐", count: 3, color: "#fbbf24" },
  ];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: C.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "50px 30px",
      }}
    >
      <div
        style={{
          opacity: fadeIn(frame),
          transform: `translateY(${slideUp(frame)})`,
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        <h2
          style={{ fontSize: 64, fontWeight: 900, color: C.white, margin: 0 }}
        >
          Correos organizados
        </h2>
        <p style={{ color: C.gray, fontSize: 28, margin: "12px 0 0" }}>
          Inteligencia que clasifica tu inbox
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: 20,
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: 900,
        }}
      >
        {categories.map((cat, i) => {
          const catSp = spring({
            frame: Math.max(0, frame - i * 25 - 20),
            fps,
            config: { damping: 30, stiffness: 100 },
          });
          return (
            <div
              key={i}
              style={{
                width: 280,
                backgroundColor: "#0d1117",
                borderRadius: 24,
                padding: "28px 24px",
                textAlign: "center",
                opacity: catSp,
                transform: `translateY(${interpolate(catSp, [0, 1], [60, 0])}px)`,
                border: `2px solid ${cat.color}33`,
                boxShadow: `0 0 40px ${cat.color}15`,
              }}
            >
              <div style={{ fontSize: 52, marginBottom: 16 }}>{cat.icon}</div>
              <div
                style={{
                  color: cat.color,
                  fontSize: 28,
                  fontWeight: 800,
                  marginBottom: 8,
                }}
              >
                {cat.name}
              </div>
              <div style={{ color: C.gray, fontSize: 20 }}>
                {cat.count} correos
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Scene: Alertas y Notificaciones
const SceneAlertas = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const alertas = [
    {
      title: "Nueva factura recibida",
      desc: "Empresa XYZ te envio $2,450",
      tipo: "factura",
      urgente: true,
    },
    {
      title: "Cita medica manana",
      desc: "Dr. Perez - 10:00 AM",
      tipo: "cita",
      urgente: true,
    },
    {
      title: "Pago pendiente",
      desc: "Factura #5678 vence en 2 dias",
      tipo: "pago",
      urgente: false,
    },
  ];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(180deg, #1c1c2e 0%, ${C.bg} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "50px 30px",
      }}
    >
      <div
        style={{
          opacity: fadeIn(frame),
          transform: `translateY(${slideUp(frame)})`,
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        <h2
          style={{ fontSize: 64, fontWeight: 900, color: C.white, margin: 0 }}
        >
          Alertas inteligentes
        </h2>
        <p style={{ color: C.gray, fontSize: 28, margin: "12px 0 0" }}>
          Lo importante, sin que se te pase
        </p>
      </div>

      <div style={{ width: "100%", maxWidth: 720 }}>
        {alertas.map((alert, i) => {
          const alertSp = spring({
            frame: Math.max(0, frame - i * 25 - 30),
            fps,
            config: { damping: 30 },
          });
          return (
            <div
              key={i}
              style={{
                backgroundColor: "#0d1117",
                borderRadius: 20,
                padding: "24px 28px",
                marginBottom: 16,
                opacity: alertSp,
                transform: `translateX(${interpolate(alertSp, [0, 1], [-80, 0])}px)`,
                borderLeft: `5px solid ${alert.urgente ? "#ef4444" : "#fbbf24"}`,
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  backgroundColor: alert.urgente ? "#ef444420" : "#fbbf2420",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                }}
              >
                {alert.tipo === "factura"
                  ? "📄"
                  : alert.tipo === "cita"
                    ? "🩺"
                    : "💰"}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    color: C.white,
                    fontSize: 24,
                    fontWeight: 700,
                    marginBottom: 4,
                  }}
                >
                  {alert.title}
                </div>
                <div style={{ color: C.gray, fontSize: 18 }}>{alert.desc}</div>
              </div>
              {alert.urgente && (
                <div
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#ef4444",
                    borderRadius: 20,
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  URGENTE
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 30,
          padding: "16px 32px",
          backgroundColor: "#22c55e20",
          borderRadius: 16,
          border: "2px solid #22c55e33",
        }}
      >
        <span style={{ color: "#4ade80", fontSize: 22, fontWeight: 600 }}>
          Notificaciones en tiempo real
        </span>
      </div>
    </div>
  );
};

// Scene 7: Reportes
const SceneReportes = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pdfProgress = interpolate(frame, [80, 160], [0, 1], CLAMP);
  const pdfScale = spring({
    frame: Math.max(0, frame - 80),
    fps,
    config: { damping: 30 },
  });
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: C.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 30px",
      }}
    >
      <div
        style={{
          opacity: fadeIn(frame),
          transform: `translateY(${slideUp(frame)})`,
          marginBottom: 30,
          textAlign: "center",
        }}
      >
        <h2
          style={{ fontSize: 72, fontWeight: 900, color: C.white, margin: 0 }}
        >
          owi
        </h2>
        <p style={{ color: C.gray, fontSize: 28, margin: "12px 0 0" }}>
          Tu asistente de correo con IA
        </p>
      </div>
      <ReportesPhone
        pdfProgress={pdfProgress}
        pdfScale={pdfScale}
        opacity={fadeIn(frame, 10, 40)}
        scale={1.15}
      />
    </div>
  );
};

// Scene 8: Send Email
const SceneSendEmail = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sentProgress = spring({
    frame: Math.max(0, frame - 150),
    fps,
    config: { damping: 30 },
  });
  const messages = [
    {
      text: "Envia un correo a cliente@empresa.com con el resumen de facturas de marzo",
      isUser: true,
      delay: 15,
    },
    {
      text: "Perfecto. Redactando correo con resumen de 4 facturas por $4,291.25...",
      isUser: false,
      delay: 55,
    },
    { text: "Correo enviado a cliente@empresa.com", isUser: false, delay: 130 },
  ];
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: C.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 40px",
      }}
    >
      <div
        style={{
          opacity: fadeIn(frame),
          transform: `translateY(${slideUp(frame)})`,
          marginBottom: 40,
          textAlign: "center",
        }}
      >
        <h2
          style={{ fontSize: 72, fontWeight: 900, color: C.white, margin: 0 }}
        >
          Envia correos con IA
        </h2>
        <p style={{ color: C.gray, fontSize: 28, margin: "12px 0 0" }}>
          Solo dile a owi que enviar
        </p>
      </div>
      <div
        style={{
          width: "100%",
          maxWidth: 720,
          backgroundColor: C.bgCard,
          borderRadius: 28,
          padding: "32px 28px",
          boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
          border: `2px solid ${C.grayDark}`,
        }}
      >
        {messages.map((m, i) => (
          <ChatBubble key={i} text={m.text} isUser={m.isUser} delay={m.delay} />
        ))}
      </div>
      <div
        style={{
          marginTop: 40,
          opacity: sentProgress,
          transform: `scale(${0.8 + sentProgress * 0.2})`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: C.green,
            fontSize: 36,
            fontWeight: 900,
            marginTop: 12,
          }}
        >
          Enviado!
        </div>
      </div>
    </div>
  );
};

// CountUpN
const CountUpN = ({
  from,
  to,
  frame,
  startAt,
  endAt,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  from: number;
  to: number;
  frame: number;
  startAt: number;
  endAt: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) => {
  const progress = interpolate(frame, [startAt, endAt], [0, 1], CLAMP);
  const val = from + (to - from) * progress;
  return (
    <>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </>
  );
};

// Scene 9: Comisiones
const SceneComisiones = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const totalSp = spring({
    frame: Math.max(0, frame - 30),
    fps,
    config: { damping: 30 },
  });
  const rows = [
    {
      id: 4,
      factura: "0010030...56789",
      base: "$132.25",
      tasa: "6%",
      comision: "$7.94",
    },
    {
      id: 3,
      factura: "0030020...45678",
      base: "$379.50",
      tasa: "6%",
      comision: "$22.77",
    },
    {
      id: 2,
      factura: "0020010...12345",
      base: "$218.50",
      tasa: "6%",
      comision: "$13.11",
    },
    {
      id: 1,
      factura: "0010010...00001",
      base: "$424.00",
      tasa: "3%",
      comision: "$12.72",
    },
  ];
  const barValues = [45, 80, 60, 100, 75, 90];
  const barColors = [C.primary, C.blue, C.primary, C.green, C.primary, C.blue];
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: C.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "50px 40px",
      }}
    >
      <div
        style={{
          opacity: fadeIn(frame),
          transform: `translateY(${slideUp(frame)})`,
          marginBottom: 24,
          textAlign: "center",
        }}
      >
        <h2
          style={{ fontSize: 64, fontWeight: 900, color: C.white, margin: 0 }}
        >
          Comisiones
        </h2>
        <p style={{ color: C.gray, fontSize: 26, margin: "10px 0 0" }}>
          Calculadas automáticamente de tus facturas
        </p>
      </div>
      <div
        style={{
          backgroundColor: C.bgCard,
          borderRadius: 24,
          padding: "28px 40px",
          width: "100%",
          maxWidth: 680,
          marginBottom: 20,
          opacity: totalSp,
          transform: `scale(${0.85 + totalSp * 0.15})`,
          border: `3px solid ${C.primary}44`,
          textAlign: "center",
          boxShadow: `0 0 40px ${C.primary}22`,
        }}
      >
        <div
          style={{
            color: C.primary,
            fontSize: 22,
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          Total Comisiones
        </div>
        <div style={{ fontSize: 64, fontWeight: 900, color: C.white }}>
          $
          <CountUpN
            from={0}
            to={56.54}
            frame={frame}
            startAt={30}
            endAt={100}
            decimals={2}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 14,
          backgroundColor: C.bgCard,
          borderRadius: 20,
          padding: "22px 28px",
          width: "100%",
          maxWidth: 680,
          marginBottom: 20,
          height: 120,
          opacity: fadeIn(frame, 40, 70),
        }}
      >
        {barValues.map((h, i) => {
          const sp = spring({
            frame: Math.max(0, frame - i * 12 - 40),
            fps,
            config: { damping: 30 },
          });
          return (
            <div
              key={i}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                height: 80,
              }}
            >
              <div
                style={{
                  width: "75%",
                  height: `${h * sp}%`,
                  backgroundColor: barColors[i],
                  borderRadius: "6px 6px 0 0",
                  maxHeight: 80,
                }}
              />
            </div>
          );
        })}
      </div>
      <div
        style={{
          backgroundColor: C.bgCard,
          borderRadius: 20,
          width: "100%",
          maxWidth: 680,
          overflow: "hidden",
          border: `2px solid ${C.grayDark}`,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "50px 1fr 90px 60px 80px",
            padding: "14px 18px",
            backgroundColor: C.bgCard2,
            color: C.gray,
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          <span>ID</span>
          <span>Factura</span>
          <span>Base</span>
          <span>Tasa</span>
          <span>Comis.</span>
        </div>
        {rows.map((r, i) => {
          const sp = spring({
            frame: Math.max(0, frame - i * 18 - 60),
            fps,
            config: { damping: 30 },
          });
          return (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "50px 1fr 90px 60px 80px",
                padding: "16px 18px",
                borderTop: `2px solid ${C.grayDark}`,
                opacity: sp,
                color: C.white,
                fontSize: 18,
              }}
            >
              <span style={{ color: C.gray }}>{r.id}</span>
              <span style={{ color: C.blue, fontSize: 15 }}>{r.factura}</span>
              <span>{r.base}</span>
              <span style={{ color: C.primary, fontWeight: 700 }}>
                {r.tasa}
              </span>
              <span style={{ color: C.green, fontWeight: 800 }}>
                {r.comision}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Scene 10: Outro
const SceneOutro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sp = spring({ frame, fps, config: { damping: 30, stiffness: 100 } });
  const features = [
    "Dashboard en tiempo real",
    "Facturas automáticas",
    "owi, tu asistente IA",
    "Reportes PDF instantáneos",
    "Citas y recordatorios",
  ];
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(180deg, #0a1628 0%, ${C.bg} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 40px",
      }}
    >
      <div
        style={{
          transform: `scale(${0.75 + sp * 0.25})`,
          opacity: fadeIn(frame, 0, 30),
          marginBottom: 32,
          filter: "drop-shadow(0 15px 40px rgba(0,0,0,0.3))",
        }}
      >
        <Img
          src={staticFile("logo.png")}
          style={{ width: 420, height: "auto" }}
        />
      </div>
      <h1
        style={{
          fontSize: 64,
          fontWeight: 900,
          color: C.white,
          textAlign: "center",
          opacity: fadeIn(frame, 20, 50),
          transform: `translateY(${slideUp(frame, 20, 50)})`,
          margin: "0 0 12px",
        }}
      >
        Tu inbox, inteligentemente gestionado.
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          marginTop: 32,
          width: "100%",
          maxWidth: 560,
        }}
      >
        {features.map((f, i) => {
          const sp2 = spring({
            frame: Math.max(0, frame - i * 15 - 40),
            fps,
            config: { damping: 30 },
          });
          return (
            <div
              key={i}
              style={{
                opacity: sp2,
                transform: `translateX(${interpolate(sp2, [0, 1], [-60, 0])}px)`,
                backgroundColor: `${C.primary}18`,
                borderRadius: 16,
                padding: "18px 28px",
                color: C.primaryLight,
                fontSize: 28,
                fontWeight: 700,
                border: `2px solid ${C.primary}33`,
                textAlign: "center",
              }}
            >
              {f}
            </div>
          );
        })}
      </div>
      {/* CTA: Solicita tu usuario de prueba */}
      <div
        style={{
          marginTop: 36,
          opacity: fadeIn(frame, 100, 140),
          transform: `translateY(${slideUp(frame, 100, 140)})`,
          textAlign: "center",
          width: "100%",
          maxWidth: 680,
        }}
      >
        <div
          style={{
            backgroundColor: C.primary,
            borderRadius: 24,
            padding: "28px 40px",
            boxShadow: `0 0 60px ${C.primary}55`,
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 900,
              color: C.white,
              letterSpacing: 1,
              marginBottom: 4,
            }}
          >
            Solicita tu usuario de prueba
          </div>
        </div>
      </div>

      {/* URLs */}
      <div
        style={{
          marginTop: 28,
          opacity: fadeIn(frame, 130, 170),
          transform: `translateY(${slideUp(frame, 130, 170)})`,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          width: "100%",
          maxWidth: 620,
        }}
      >
        <div
          style={{
            backgroundColor: "#0d1117",
            borderRadius: 18,
            padding: "18px 32px",
            border: `2px solid ${C.primary}44`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: C.primary,
            }}
          />
          <span
            style={{
              fontSize: 30,
              fontWeight: 800,
              color: C.primary,
              letterSpacing: 1,
            }}
          >
            owbitz.com
          </span>
        </div>
        <div
          style={{
            backgroundColor: "#0d1117",
            borderRadius: 18,
            padding: "18px 32px",
            border: `2px solid ${C.primary}44`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: C.primary,
            }}
          />
          <span
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: C.primaryLight,
              letterSpacing: 0.5,
            }}
          >
            owmail.owbitz.com
          </span>
        </div>
      </div>
    </div>
  );
};

// Root
export const MyComposition = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: C.bg,
        fontFamily: "system-ui, -apple-system, sans-serif",
        overflow: "hidden",
      }}
    >
      <Sequence durationInFrames={T.logoIntro.dur}>
        <SceneLogoIntro />
      </Sequence>
      <Sequence from={T.emailConn.from} durationInFrames={T.emailConn.dur}>
        <SceneEmailConnections />
      </Sequence>
      <Sequence from={T.dashboard.from} durationInFrames={T.dashboard.dur}>
        <SceneDashboard />
      </Sequence>
      <Sequence from={T.facturas.from} durationInFrames={T.facturas.dur}>
        <SceneFacturas />
      </Sequence>
      <Sequence from={T.citas.from} durationInFrames={T.citas.dur}>
        <SceneCitas />
      </Sequence>
      <Sequence from={T.owiChat.from} durationInFrames={T.owiChat.dur}>
        <SceneOwiChat />
      </Sequence>
      <Sequence from={T.summaries.from} durationInFrames={T.summaries.dur}>
        <SceneSummaries />
      </Sequence>
      <Sequence
        from={T.categorizacion.from}
        durationInFrames={T.categorizacion.dur}
      >
        <SceneCategorizacion />
      </Sequence>
      <Sequence from={T.alertas.from} durationInFrames={T.alertas.dur}>
        <SceneAlertas />
      </Sequence>
      <Sequence from={T.reportes.from} durationInFrames={T.reportes.dur}>
        <SceneReportes />
      </Sequence>
      <Sequence from={T.sendEmail.from} durationInFrames={T.sendEmail.dur}>
        <SceneSendEmail />
      </Sequence>
      <Sequence from={T.comisiones.from} durationInFrames={T.comisiones.dur}>
        <SceneComisiones />
      </Sequence>
      <Sequence from={T.outro.from} durationInFrames={T.outro.dur}>
        <SceneOutro />
      </Sequence>
    </div>
  );
};
