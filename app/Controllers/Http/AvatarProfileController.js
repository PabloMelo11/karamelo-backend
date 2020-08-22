const Helpers = use('Helpers');

class AvatarProfileController {
  async update({ request, auth }) {
    const user = await auth.getUser();

    const avatar = request.file('avatar');

    if (avatar) {
      await avatar.move(Helpers.tmpPath('uploads'), {
        name: `${new Date().getTime()}.${avatar.subtype}`,
      });

      if (!avatar.moved()) {
        return avatar.error();
      }

      user.avatar = avatar.fileName;
    }

    await user.save();

    return user;
  }
}

module.exports = AvatarProfileController;
