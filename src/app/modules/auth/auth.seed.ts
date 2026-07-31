import bcrypt from "bcrypt";
import { UserModel } from "./auth.model";
import config from "../../config";

export const seedAdmin = async () => {
    try {
        if (!config.initialAdminName || !config.initialAdminEmail || !config.initialAdminPassword || !config.initialAdminPhone) {
            console.log("⚠️ Initial admin configuration missing, skipping seeding.");
            return;
        }

        const adminExists = await UserModel.findOne({
            role: "ADMIN",
        });

        if (!adminExists) {
            console.log("📝 No admin found, creating one...");

            const name = config.initialAdminName;
            const password = config.initialAdminPassword;
            const email = config.initialAdminEmail;
            const phone = config.initialAdminPhone;

            const hashedPassword = await bcrypt.hash(password as string, Number(config.bcrypt_salt_rounds));

            const admin = {
                name: name,
                email: email,
                password: hashedPassword,
                role: "ADMIN",
                phone: phone,
                isActive: true,
                isEmailVerified: true,
            };

            await UserModel.create(admin as any);

            console.log("✅ Admin created:", email);
        } else {
            console.log("✅ Admin already exists, skipping creation");
        }
    } catch (error) {
        console.error("❌ Error seeding admin:", error);
    }
};
